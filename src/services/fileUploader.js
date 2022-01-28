const aws = require('./aws_s3');

const uploadImage = async (image, next) => {
  try{
  const {Location, Key} = await aws.uploadFile(image, next);

  const response = {
    url: Location,
    key: Key
  };

  return response;
  }
  catch(err){
      next(err)
  }
};

module.exports = {
  uploadImage
};