const db = require("../models");
const { Op } = require("sequelize");

const generateSearch = (entity, search='') =>{
    if (search){
    return {
        where: {
          [Op.or]: Object.keys(db[entity].rawAttributes).map(
            (e) => (e = { [e]: { [Op.like]: `%${search.trim()}%` } })
          ),
        },
      };
    }
    return false
}

module.exports = {
    generateSearch,
  };