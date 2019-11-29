const db = require('../database/dbConfig.js')

module.exports = {
    find,
    findById,
    addResource,
      
  };

  function find() {
  return db('resources')
  }

function findById(id) {
 return db('resources')
 .where({ id: Number(id) })
 .first()  
 }

 function addResource(resource) {
return db('resources') 
.insert(resource)
.then(id => {
return findById(id[0])
  });  
}