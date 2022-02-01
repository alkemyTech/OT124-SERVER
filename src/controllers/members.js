const db = require('../models');
const entity = 'members'
 const getMembers = async function(req,res,next) {
  const resMembers= await db[entity].findAll();
   if (resMembers ){
      res.send(resMembers)
   }else{
      let err = new Error('problema al encontrar miembros')
      err.name = 'NotFoundError'
      throw err 
   }
}


const postMember = async (req, res, next) => {
    try {
        const { name } = req.body;
        let image = null;
        if (req.body && req.body.image) image = req.body.image;

        const createMember = await db[entity].create({
            name,
            image
        });
        res.send({
            title: "Members",
            message: "Miembro creado con exito!",
            newMember: createMember
        });
    } catch (err) {
        next(err);
    }
}

const membersController = {
    getMembers,
    postMember
};
  
module.exports = membersController;