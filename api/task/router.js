// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();
const HelperFuncs = require('./model');


/// ENDPOINTS
router.get("/", (req,res) => {
    HelperFuncs.getAllTasks()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post("/", (req,res) => {
    // add new task to tasks table. description and project_id are requried.
    HelperFuncs.addNewTask(req.body)
    .then(async data => {
        //data is the id of newly added task
        const newTask = await HelperFuncs.getTaskById(data)

        res.status(201).json(newTask[0]) //collection of length = 1
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;