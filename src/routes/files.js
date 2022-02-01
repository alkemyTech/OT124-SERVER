var express = require('express');
const { getFileByKey, getAllFiles, deleteFileByKey, updateFileByKey, createFile } = require('../controllers/files');

const multer  = require('multer')
const upload = multer()

var router = express.Router();


router.get('/', getAllFiles);
router.post('/', upload.single('image'), createFile);
router.get('/:key', getFileByKey);
router.delete('/:key', deleteFileByKey);
router.put('/:key', upload.single('image'), updateFileByKey);


module.exports = router;
