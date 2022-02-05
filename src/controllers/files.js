const {
  searchFiles,
  deleteFile,
  updateFile,
  uploadFile,
  downloadFile,
} = require("../services/aws_s3");

const getFileByKey = async function (req, res, next) {
  try {
    const key = req.params.key;
    const readStream = await downloadFile(key, next);
    res.type(readStream.ContentType);
    return readStream.Body.pipe(res);
  } catch (err) {
    next(err);
  }
};

const getAllFiles = async function (req, res, next) {
  try {
    const files = await searchFiles(next);
    res.send({
      keys:
        files?.map((e) => e.Key) || "There are no files in the Amazon Bucket",
    });
  } catch (err) {
    next(err);
  }
};

const deleteFileByKey = async function (req, res, next) {
  try {
    const { key } = req.params;
    const file = await deleteFile(key, next);
    if (file) {
      return res.send({ msg: "File deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
};

const updateFileByKey = async function (req, activityFound) {
  const key = activityFound.image;
  if (req.file) {
    await updateFile(key, req.file);
    return { msg: "File updated successfully" };
  }
};

const createFile = async function (req) {
  if (req.file) {
    const { key } = await uploadFile(req.file);

    if (key) {
      return { msg: "File uploaded successfully", key: key };
    }
  }
};

const filesController = {
  getFileByKey,
  getAllFiles,
  deleteFileByKey,
  updateFileByKey,
  createFile,
};

module.exports = filesController;
