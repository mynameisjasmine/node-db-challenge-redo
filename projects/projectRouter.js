const express = require('express');

const Projects = require('./project-model.js');
const router = express.Router();

//GET projects
router.get('/', (req, res) => {
Projects.find()
.then(projects => {
res.status(200).json(projects)
})
.catch(err => {
res.status(500).json({error: "Failed to retrieve projects"})
 });
})

//GET projects by ID
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

//POST projects
router.post('/', (req, res) => {
    const { name } = req.body
    if (!name) {
    res.status(400).json({error: "You must provide a name for this project"})
    } else {
  Projects.add(req.body)
  .then(project => {
  res.status(201).json(project)
    })
    .catch(err => {
    res.status(404).json({error: "Unable to post project"})
    });
    }
  })

//POST tasks
router.post('/:id/tasks', (req, res) => {
const { description } = req.body
if(!description) {
res.status(400).json({error: "You must add a description to post this task"})
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