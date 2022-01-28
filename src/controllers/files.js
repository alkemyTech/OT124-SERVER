const { downloadImage } = require("../services/fileDownloader")

const getFileByKey = async function(req, res, next){
    try{
      const key = req.params.key
      const readStream = await downloadImage(key, next)
      readStream.pipe(res)
    }
    catch(err){
        next(err)
    }
}

const filesController = {
  getFileByKey
};

module.exports = filesController