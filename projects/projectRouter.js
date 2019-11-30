const express = require('express');

const Projects = require('./project-model.js');
const router = express.Router();

//GET projects /api/projects
router.get('/', (req, res) => {
Projects.find()
.then(projects => {
res.status(200).json(projects)
})
.catch(err => {
res.status(500).json({error: "Failed to retrieve projects"})
 });
})

//GET projects by ID /api/projects/:id
router.get('/:id', (req, res) => {
const id = req.params.id
Projects.findById(id)
.then(project => {
res.status(200).json(project)   
})
.catch(err => {
res.status(500).json({error: "Failed to retrieve project with given id"})
 });
})


  //POST projects /api/projects (must provide 'name', 'description', 'resourceId' and 'completed' (integer 0 or 1) to post projects)
router.post('/', (req, res) => {
  const { name, description, resourceId, completed } = req.body
  if (!name && !description && !resourceId && !completed) {
  res.status(400).json({error: "You must provide a name, description, resourceId and completed (0 for false and 1 for true) for this project"})
  } 
Projects.add(req.body)
.then(project => {
res.status(201).json(project)
  })
  .catch(err => {
  res.status(404).json({error: "Unable to post project"})
  });
  
})

//POST tasks   /api/projects/:id/tasks
router.post('/:id/tasks', (req, res) => {
const { description, projectId } = req.body
if(!description || !projectId) {
res.status(400).json({error: "You must add a description and projectId to post this task"})
}
const taskData = req.body;
const id = req.params.id;

Projects.findById(id)
.then(task => {
 if(task) {
 Projects.addTask(taskData, id)
 .then(newTask => {
 res.status(201).json(newTask)
 })
 } else {
 res.status(404).json({error: "Unable to find task with given id"})
 }
})
.catch(err => {
res.status(500).json({error: "Failed to create new task"})
 })
})

//GET tasks /api/projects/:id/tasks
router.get('/:id/tasks', (req, res) => {
  const id = req.params.id
  Projects.getTasks(id)
  .then(tasks => {
  res.status(200).json(tasks)
  })
  .catch(err => {
  res.status(500).json({error: "Failed to retrieve tasks"})
   });
  })

//PUT projects
router.put('/:id', (req, res) => {
const id = req.params.id
const changes = req.body

Projects.findById(id)
.then(project => {
if (project) {
Projects.update(changes, id)
.then(updateProject => {
res.json(updateProject)
});
} else {
res.status(404).json({error: "Failed to find project with given id"})
}
})
.catch(err => {
res.status(500).json({error: "Failed to update project"})
 });
})




module.exports = router;