const db = require('../database/dbConfig.js');



module.exports = {
  find,
  findById,
  add,
  addTask,
  getTasks,
  update,
  remove  
};

function find() {
return db('projects')
}

function findById(id) {
 return db('projects')
 .where({ id: Number(id) })
 .first()  
}


function add(project) {
  console.log('inside add project', project);
 return db('projects') 
 .insert(project)
 .then(id => {
 return findById(id[0])
 });  
}

function addTask(task, id) {
  return db('tasks')
  .where({projectId: id}) 
  .insert(task)
  .then(id => {
  return findById(id[0])
    });  
  }

//   function getTasks(id) {
//     return db('tasks')
//     .where({ id: Number(id) })
//  .first()
//     }

    function getTasks(id) {
      return db('tasks as t')
      .join('projects as p')
      // .select('t.id', 'p.id', 't.description' )
      .select('t.id', 't.description', 't.completed' )
      .where('t.projectId', id)
      .where('p.id', id)
   
      }


function update(changes, id) {
return db('projects') 
.where({ id: Number(id) }) 
.update(changes)
}

function remove(id) {
 return db('projects') 
 .where('id', id) 
 .del(); 
}