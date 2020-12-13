// build your `/api/projects` router here
const express = require('express');
const router = express.Router();
const HelperFuncs = require('./model');


/// ENDPOINTS
router.get("/", (req,res) => {
    HelperFuncs.getAllProjects()
    .then(data => {

        data.forEach(project => {
            if (project.completed === 0){
                project.completed = false;
            } else {
                project.completed = true;
            }
        })
        
        // this works but i dont need a new array returned, so went with forEach
        // data.map(project => {
        //     console.log(project.completed)
        //     if(project.completed === 0){
        //         project.completed = false;
        //     } else {
        //         project.compelted = true;
        //     }
        // })

        res.status(200).json(data) //could we make forEach a promie and attach this to another then?
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post("/", (req,res) => {

    const newProjectObj = {
        name: req.body.name,                //required
        description: req.body.description,  //optional
        completed: !req.body.completed ? false : req.body.completed // if blank, set to false
    }

    //add new project to projects table.
    HelperFuncs.addNewProject(newProjectObj)
    .then(newProjectId => {
        //addNewProject returns new project id
        return HelperFuncs.getProjectById(newProjectId);
    })
    .then(project => {
        //converting boolean values to true/false
        if(project[0].completed === 0){
            return { ...project[0], completed: false}
        } else {
            return{ ...project[0], completed: true}
        }
    })
    .then(results => {
        //returns new project
        res.status(201).json(results)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;