const entity = 'users'
const db = require('../models')

const deleteUser = async (req, res, next) => {
    //when we have jwt, we need to insert validation token here
  
    try {
        console.log(db.users)
        const {
            id
        } = req.params
        // console.log(id)
        // console.log(typeof id)
        if (!id) {
            let err = new Error("the id wasn't sent")
            err.name = 'ValidationError'
            throw err
        } else {
            const idFound = await db[entity].findOne({where: {id}})
            //console.log(idFound)
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

const getAllUsers = async (req, res, next) => {
    try {
        const users = await db[entity].findAll();
        res.send({
            users
        });
    } 
    catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await db[entity].findByPk(id);
        
        if (!user) {
            let err = new Error("User not found");
            err.name= 'NotFoundError';
            throw err;
        }

        return res.status(200).send({
            user
        });
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, role } = req.body;
        
        const userUpdate = await db[entity].update(
            { firstName, lastName, email, role },
            { where: { id: id } }
        );

        if (!userUpdate) {
            let err = new Error("User not found");
            err.name = "NotFoundError";
            throw err;
        }

        return res.status(200).send({
            title: "Users",
            message: "The User has been updated successfully",
            userUpdate
        });
    } catch (err) {
        next(err);
    }
}

const usersController = {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
};

module.exports = usersController;