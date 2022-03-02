var express = require('express');
const { getFileByKey, getAllFiles, deleteFileByKey, updateFileByKey, createFile } = require('../controllers/files');

const { isAdmin } = require("../middlewares/isRole");
const { validateToken } = require("../middlewares/auth");

const multer  = require('multer')
const upload = multer()

var router = express.Router();


router.get('/', validateToken, isAdmin, getAllFiles);
router.post('/', validateToken, isAdmin, upload.single('image'), createFile);
router.get('/:key', getFileByKey);
router.delete('/:key', validateToken, isAdmin, deleteFileByKey);
router.put('/:key', validateToken, isAdmin, upload.single('image'), updateFileByKey);


module.exports = router;
