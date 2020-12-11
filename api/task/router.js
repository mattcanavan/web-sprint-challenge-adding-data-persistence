// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();
const HelperFuncs = require('./model');


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

router.post("/", (req,res) => {
    
    if(!req.body.project_id || !req.body.description){
        res.status(404).json({ message: "required field project_id OR description missing in req body."})
    } else {
        HelperFuncs.getTaskById(req.body.projct_id)
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            res.status(404).json( { message: `project_id ${req.body.project_id} does not exist.`})
        })
    }

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