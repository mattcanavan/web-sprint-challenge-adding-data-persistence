// build your `/api/projects` router here
const express = require('express');
const router = express.Router();
const HelperFuncs = require('./model');


/// ENDPOINTS
router.get("/", (req,res) => {
    HelperFuncs.getAllProjects()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post("/", (req,res) => {
    //add new project to projects table. (name required, description and completed optional)
    HelperFuncs.addNewProject(req.body)
    .then(async success => {
        //success equals new resource id
        const newProject = await HelperFuncs.getProjectById(success);

        if(newProject[0].completed === 0){
            return { ...newProject[0], completed: false}
        } else {
            return{ ...newProject[0], completed: true}
        }
    })
    .then(data => {
        res.status(201).json(data)
    })

    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;