const express = require('express');

const Resources = require('./resource-model.js');
const router = express.Router();



//GET resources /api/resources
router.get('/', (req, res) => {
    Resources.find()
    .then(resources => {
    res.status(200).json(resources)
    })
    .catch(err => {
    res.status(500).json({error: "Failed to retrieve resources"})
     });
    })

//GET resources by ID /api/resources/:id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Resources.findById(id)
    .then(resource => {
    res.status(200).json(resource)   
    })
    .catch(err => {
    res.status(500).json({error: "Failed to retrieve resource with given id"})
     });
    })

//POST resources /api/resources
router.post('/', (req, res) => {
    const { name } = req.body
    if (!name) {
    res.status(400).json({error: "You must provide a name for this resource"})
    } else {
  Resources.addResource(req.body)
  .then(resource => {
  res.status(201).json(resource)
    })
    .catch(err => {
    res.status(404).json({error: "Unable to post resource"})
    });
    }
  })



    module.exports = router;