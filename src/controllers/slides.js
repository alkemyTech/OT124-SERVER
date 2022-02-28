const db = require("../models");
const entity = "slides";

const getSlides = async (req, res, next) => {
    try {
        const slides = await db[entity].findAll();
        let err;

        if (!slides) {
            err = new Error("User not found");
            err.name= 'NotFoundError';
            throw err;
        }

        res.send({
            slides
        });
    } 
    catch (err) {
        next(err);
    }
}

const slidesController = {
    getSlides
};

module.exports = slidesController;