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
    //add new project to projects table. (name required, description and completed optional)
    HelperFuncs.addNewProject(req.body)
    .then(newResourceId => {
        //addNewProject returns new resource id
        return HelperFuncs.getProjectById(newResourceId);
    })
    .then(success => {
        if(success[0].completed === 0){
            return { ...success[0], completed: false}
        } else {
            return{ ...success[0], completed: true}
        }
    })
    .then(results => {
        res.status(201).json(results)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;