// build your `/api/resources` router here
const express = require('express');
const router = express.Router();
const HelperFuncs = require('./model');


/// ENDPOINTS
router.get("/", (req, res) => {
    // get all resources from resources tables
    HelperFuncs.getAllResources()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post("/", (req, res) => {
    //post a new resource to resources table (unique name, deescription optional)
    HelperFuncs.addNewResource(req.body)
    .then(async success => {
        //success equals new resource id
        const newResource = await HelperFuncs.getById(success)

        if(newResource[0].completed === 0){  //collection always has length = 1
            return { ...newResource[0], completed: false}
        } else {
            return{ ...newResource[0], completed: true}
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