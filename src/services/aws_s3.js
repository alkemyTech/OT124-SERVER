const AWS = require('aws-sdk');
const uuid = require('uuid');

// AWS account data
const bucketName = process.env.AWS_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

// Create S3 instance
const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
});

const uploadFile = async (file, next) => {
  try{
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: uuid.v4()
  };
    return s3.upload(uploadParams).promise();
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
  const res = await s3.getObject(downloadParams).promise();
  if (res){
    return s3.getObject(downloadParams).createReadStream()
  }
  }
  catch(err){
    next(err)
  }
};

module.exports = {
  uploadFile,
  downloadFile
};