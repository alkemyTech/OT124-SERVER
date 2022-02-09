const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_REGION;

const generateS3Url = (key) =>{
    return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`
}

module.exports = {generateS3Url}