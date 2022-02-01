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


const membersController = {
   getMembers,
};

module.exports = membersController;