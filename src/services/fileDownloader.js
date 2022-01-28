const aws = require('./aws_s3');

const downloadImage = async (key, next) => {
    try{
    const response = await aws.downloadFile(key, next);
    return response
    }
    catch(err){
        next(err)
    }
  };
  
  module.exports = {
    downloadImage
  };