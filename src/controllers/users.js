const entity = 'users';
const db = require('../models');
const { generateEncryptedPassword } = require('../helpers/generateEncryptedPassword');
const { calculatePagination } = require('../helpers/calculatePagination');
const { generateSearch } = require('../helpers/generateSearch');

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { force } = req.query;
        if (!id) {
            let err = new Error("the id wasn't sent")
            err.name = 'ValidationError'
            throw err
        } else {
            if (force) {
                const idFound = await db[entity].findOne({where: {id}})
                if (!idFound) {
                    let err = new Error('user not found, id invalid')
                    err.name = 'NotFoundError'
                    throw err
                } else {
                    await db[entity].destroy({
                        where: {
                            id: id
                        },
                        force: true
                    });

                    res.send({
                        errors: null,
                        message: 'the user was successfully deleted in force mode'
                    });
                }
            } else {
                const idFound = await db[entity].findOne({where: {id}})
                const donate = await db["Donate"].findOne({where: {userId: idFound.id}})
                if (donate){
                    await  db["Donate"].destroy({
                        where: {
                            id: donate.dataValues.id
                        },
                    });
                }
                if (!idFound) {
                    let err = new Error('user not found, id invalid')
                    err.name = 'NotFoundError'
                    throw err
                } else {
                    await db[entity].destroy({
                        where: {
                            id: id
                        },
                        force: true
                    })
                    res.send({
                        errors: null,
                        message: 'the user was successfully deleted'
                    })
                }
            }
        }
    } catch (err) {
        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    const {size, page, search} = req.query
    try {
        const { limit, offset } = calculatePagination(size, page)

        const searchQuery = generateSearch(entity, search)

        const users = await db[entity].findAndCountAll({limit, offset, ...searchQuery});
        res.send({
            users: users?.rows,
            count: users?.count
        });
    } 
    catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await db[entity].findOne({
            where: { id },
            attributes: {
              exclude: ["password", "createdAt", "updatedAt", "deletedAt"]
            }
        });
        
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
        const { firstName, lastName, email, role, password } = req.body;

        const user = await db[entity].findOne({
            where: { id }
        });

        if (!user) {
            let err = new Error("User not found");
            err.name= 'NotFoundError';
            throw err;
        }
        
        if (password){
            passwordHash = await generateEncryptedPassword(password);
        }

        let payload = {
            firstName,
            lastName,
            email,
            password: password ? passwordHash : user.dataValues.password,
            role
        }
        
        const userUpdate = await db[entity].update(
            payload,
            { where: { id } }
        );

        res.status(200).send({
            title: "Users",
            message: "The User has been updated successfully"
        });
    } catch (err) {
        next(err);
    }
}

const updateSelf = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;

        const userUpdate = await db[entity].update(
            {firstName, lastName, email},
            { where: { id } }
        );

        console.log(userUpdate)
        res.status(200).send({
            title: "Users",
            message: "The User has been updated successfully"
        });
    } catch (err) {
        next(err);
    }
}

const postUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const userFound = await db[entity].findOne({
            where: { email: email },
        });

        if (userFound) {
            let err = new Error("User already exists");
            err.name = "ConflictError";
            throw err;
        } else {
            passwordHash = await generateEncryptedPassword(password);

            let payload = {
                firstName,
                lastName,
                email,
                password: passwordHash,
                role
            }

            if (req?.body?.id) payload.id = req.body.id;

            const newUser = await db[entity].create(payload);
            const user = await db[entity].findOne({
                where: { id: newUser.id },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
            });
            
            return res.status(201).send({
                title: "Users",
                message: "The User has been created successfully",
                user
            });
        }
    } catch (err) {
        next(err);
    }
}

const restore = async (req, res, next) => {
    try {
        const { id } = req.params;

        const restoredUser = await db[entity].restore({ where: { id } });

        if (!restoredUser) {
            let err = new Error("User not found");
            err.name = "NotFoundError";
            throw err;
        }

        res.status(200).send({
            title: "Users",
            message: "The User has been restored successfully"
        });
    } catch (err) {
        next(err);
    }
}

const usersController = {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    postUser,
    restore,
    updateSelf
};

module.exports = usersController;