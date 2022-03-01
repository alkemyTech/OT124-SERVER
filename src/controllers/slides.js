const db = require("../models");
const entity = "slides";
const { parseS3Url } = require('../helpers/parseS3Url');
const { uploadFile, updateFile } = require("../services/aws_s3");

const getSlides = async (req, res, next) => {
    try {
        const slidesFound = await db[entity].findAll({ 
            order: [["order", "ASC"]] 
        });
        let err;

        if (!slidesFound) {
            err = new Error("Slides not found");
            err.name= 'NotFoundError';
            throw err;
        }

        const slides = slidesFound?.map(item => {
            if (item.image) {
              const parsedImage = parseS3Url(item.image);
              item.image = parsedImage;
            }
            return item;
        });

        res.send({
            slides
        });
    } 
    catch (err) {
        next(err);
    }
}

const updateSlides = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const slideFound = await db[entity].findOne({
            where: { id }
        });
      
        if (!slideFound) {
            const error = new Error("Slide not found");
            error.name = "NotFoundError";
            throw error;
        }

        if (req.file) {
            // If also a key was provided, update file with key and and update testimonialFound url
            if (body.key) {
              const { url } = await updateFile(body.key, req.file, next);
              slideFound.image = url;
              // If the is no provided key, upload new file and update testimonialFound url
            } else {
              const { url } = await uploadFile(req.file, next);
              slideFound.image = url;
            }
        }

        // If name was provided, update testimonialfound
        if (body.text) {
            slideFound.name = body.name;
        }
        // If content was provided, update testimonialFound
        if (body.order) {
            slideFound.content = body.content;
        }

        await slideFound.save();

        return res.status(200).json({
            title: "Slides",
            message: "The slide has been updated successfully"
        });
    } catch (err) {
        next(err);
    }
}

const slidesController = {
    getSlides,
    updateSlides
};

module.exports = slidesController;