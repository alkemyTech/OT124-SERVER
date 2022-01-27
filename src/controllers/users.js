const entity = 'Contacts'
const db = require('../models')

const deleteUser = async (req, res, next) => {
    //when we have jwt, we need to insert validation token here
    try {
        const {
            id
        } = req.params
        console.log(id)
        if (!id) {
            let err = new Error("the id wasn't sent")
            err.name = 'ValidationError'
            throw err
        } else {
            const idFound = await db[entity].findOne({ where: {id} })
            console.log(idFound)
            if (!idFound) {
                let err = new Error('user not found, id invalid')
                err.name = 'NotFoundError'
                throw err

            } else {

                await db[entity].destroy({
                    where: {
                        id: id
                    }
                })
                res.send({
                    errors: null,
                    message: 'the user was successfully deleted'
                })
            }
        }
    } catch (err) {
        next(err)
    }
}

const usersController = {
    deleteUser
};

module.exports = usersController;