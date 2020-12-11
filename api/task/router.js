// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();
const HelperFuncs = require('./model');
const ProjectHelperFuncs = require('../project/model')

/// MIDDLEWARE
const checkForRequiredFields = (req, res, next) => {

    if (!req.body.project_id || !req.body.description) {
        //does req have project_id and description?
        return res.status(404).json({ message: "required field project_id OR description missing in req body." })
    } else {
        //everything fine? pass back control to POST method
        next();
    }
};

     
const checkIfProjectIdExists = (req, res, next) => {

    ProjectHelperFuncs.getProjectById(req.body.project_id)
        .then(success => {
            //since the project_id exists, pass control back to POST method to add new task
            next();
        })
        .catch(error => {
            res.staus(404).json({ message: error.message})
        })

};


/// ENDPOINTS
router.get("/", (req,res) => {
    HelperFuncs.getAllTasks()
    .then(success => {

        success.forEach(task => {
            if (task.completed === 0){
                task.completed = false;
            } else {
                task.completed = true;
            }
        })

        res.status(200).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post("/", checkForRequiredFields, checkIfProjectIdExists, (req,res) => {

    // add new task to tasks table. description and project_id are requried.
    HelperFuncs.addNewTask(req.body)
    .then(async data => {
        //data is the id of newly added task
        const newTask = await HelperFuncs.getTaskById(data)

        if(newTask[0].completed === 0){  //collection always has length = 1
            return { ...newTask[0], completed: false}
        } else {
            return{ ...newTask[0], completed: true}
        }

    })
    .then(success => {
        res.status(201).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;