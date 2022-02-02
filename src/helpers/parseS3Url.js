const parseUrl = require('s3-url-parser')

const parseS3Url = (url) =>{
    return parseUrl(url)
}

module.exports = {parseS3Url}