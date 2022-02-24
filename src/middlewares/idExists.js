const idExists =   (req, res, next) =>{
    const { id } = req.params;

        if(id == "undefined") {
            let err = new Error("id is undefined");
            err.name = "NotFoundError";
            throw err;
        } else {
            next()
        }
     
    };
    module.exports = {idExists}