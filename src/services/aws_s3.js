const S3 = require('@aws-sdk/client-s3');
const uuid = require('uuid');
const { generateS3Url } = require('../helpers/generateS3url');

// AWS account data
const bucketName = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

// Create S3 instance
const s3 = new S3.S3({
  region,
  accessKeyId,
  secretAccessKey
});

const uploadFile = async (file, next) => {
  try{
  const key = uuid.v4()
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: key,
    ContentType: file.mimetype
  };
    
    const object =  await s3.putObject(uploadParams)
    const url = generateS3Url(key)
    return {object, url}
  }
  catch(err){
    next(err)
  }
};

const downloadFile = async (key, next) => {
  try{ 
    const downloadParams = {
      Key: key,
      Bucket: bucketName
    };
    const res =  await s3.getObject(downloadParams)
    if (res){
      return res
    }
  }
  catch(err){
    next(err)
  }
};

const searchFiles = async (next) =>{
  try{
    const {Contents} = await s3.listObjects({ Bucket: bucketName})
    return Contents
  }
  catch(err){
    next(err)
  }
}

const deleteFile = async (key, next) =>{
  try{
    const deleteParams = {
      Key: key,
      Bucket: bucketName
    };

    const object = await s3.getObject(deleteParams)
    if (object){
      return await s3.deleteObject(deleteParams)
    }
  }
  catch(err){
    next(err)
  }
}

const updateFile = async (file, key, next) =>{
  try{
    const updateParams = {
      Key: key,
      Body: file.buffer,
      Bucket: bucketName,
      contentType: file.mimeType
    };
    let object = await s3.getObject({Key: key, Bucket: bucketName})
    if (object){
      const url = generateS3Url(key)
      await s3.putObject(updateParams)
      return { url }
    }
  }
  catch(err){
    next(err)
  }
}

module.exports = {
  uploadFile,
  downloadFile, 
  searchFiles,
  deleteFile,
  updateFile
};