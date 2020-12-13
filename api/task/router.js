// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();
const HelperFuncs = require('./model');
const ProjectHelperFuncs = require('../project/model')

/// MIDDLEWARE
const checkForRequiredFields = (req, res, next) => {

    if (!req.body.project_id || !req.body.description) {
        //does req have project_id and description?
        return res.status(500).json({ message: "required field project_id OR description missing in req body." })
    } else {
        //everything fine? continue with request
        next();
    }
};
     
const checkIfProjectIdExists = (req, res, next) => {

    //does the provided project_id exists? lets try and find it
    ProjectHelperFuncs.getProjectById(req.body.project_id)
    .then(results => {
        if(results.length > 0){
            next();
        } else{
            res.status(404).json({ message: `project with id ${req.body.project_id} does not exist.`})
            // throw new Error(`project with id ${req.body.project_id} does not exist.`) // is this ok??
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message }) //general server error
    })

};


/// ENDPOINTS
router.get("/", (req,res) => {
    HelperFuncs.getAllTasks()
    .then(success => {

        //converting boolean values to true/false
        success.forEach(task => {
            if (task.completed === 0){
                task.completed = false;
            } else {
                task.completed = true;
            }
        })

        //return all tasks
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post("/", checkForRequiredFields, checkIfProjectIdExists, (req,res) => {

    const newTaskObj = {
        description: req.body.description,  //required
        notes: req.body.notes,
        completed: !req.body.completed ? false : req.body.completed, //if null, default to false.
        project_id : req.body.project_id    //required
    }

    //since required fields and project_id exist, let's add new task
    HelperFuncs.addNewTask(newTaskObj)
    .then(newTaskId => {
        //getting new task to dispaly for user
        return HelperFuncs.getTaskById(newTaskId)
    })
    .then(newTask => {
        //converting boolean values to true/false
        if(newTask[0].completed === 0){  
            return { ...newTask[0], completed: false} //newTask collection always has length = 1
        } else {
            return{ ...newTask[0], completed: true}
        }
    })
    .then(success => {
        //display newTask
        res.status(201).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;