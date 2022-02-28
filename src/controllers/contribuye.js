
require("dotenv").config();
const TOKEN = process.env.ACCESS_TOKEN_MP;
const jwt = require('jsonwebtoken')
const mercadopago = require('mercadopago');
const { awardOne, awards } = require("../helpers/awardSystem");
const db = require("../models");
const donate = require("../models/donate");

const postDonate = async function (req, res, next) {
    mercadopago.configurations.setAccessToken(TOKEN);
    //  console.log(mercadopago.configurations.getAccessToken())

    const payment_data = {
        transaction_amount: Number(req.body.transaction_amount),
        token: req.body.token,
        description: req.body.description,
        installments: Number(req.body.installments),
        payment_method_id: req.body.payment_method_id,
        issuer_id: req.body.issuer_id,
        payer: {
            email: req.body.payer.email,
            identification: {
                type: req.body.payer.identification.type,
                number: req.body.payer.identification.number,
            },
        },
    };


    mercadopago.payment
        .save(payment_data)
        .then(async (response) => {

            var resDonate
            if (response.body.status == "approved") {
                let resDonateExists = await db['Donate'].findOne({ where: { userId: req.user.id } })
                if (resDonateExists) {
                    let amountTotal = resDonateExists.dataValues.amounts + payment_data.transaction_amount
                    resDonate = await resDonateExists.update({
                        amounts: amountTotal,
                        award: awards(amountTotal)
                    })

                } else {
                    console.log(({
                        amounts: payment_data.transaction_amount,
                        userId: req.user.id,
                        award: awards(payment_data.transaction_amount)
                    }))
                    resDonate = await db['Donate'].create({
                        amounts: payment_data.transaction_amount,
                        userId: req.user.id,
                        award: awards(payment_data.transaction_amount)
                    })
                }

                //    console.log(resDonate, "resdonate")

                next();
            }
            return res.sendStatus(201).json({
                status: response.body.status,
                amounts: resDonate.dataValues.amounts
            });
        })
        .catch((err) => {
            next(err)
        });
}

const getDonatesUser = async function (req, res, next) {
    try {

        let resDonate = await db['Donate'].findOne({
            where: { userId: req.user.id }
        })
        res.send(resDonate)
    } catch (err) {
        next(err)
    }
}
const getDonatesAll = async function (req, res, next) {

    try{
        let donators = await db['users'].findAll(
            {
                include: [{
                    as: 'donates', model: db['Donate'], attributes: {
                        exclude:
                            ["userId", "createdAt", "updatedAt"]
                    }
                }],
                attributes: {
                    exclude:
                        ['password', "createdAt", "updatedAt", "deletedAt"]
                },
                order: [
                    ["donates", 'amounts', 'DESC']
                ]
            })
        if (donators) {
            res.send(donators)
        } else {
            res.send(donators)
        }
    }catch(err){
        next(err)
    }
}

module.exports = { postDonate, getDonatesUser, getDonatesAll }


