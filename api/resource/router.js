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

    const newResourceObj = {
        name: req.body.name,                //required
        description: req.body.description   //optional
    }

    //post a new resource to resources table
    HelperFuncs.addNewResource(newResourceObj)
    .then(newResourceID => {
        //retrieve new resource from db by id
        return HelperFuncs.getById(newResourceID)
    })
    .then(resource => {
        //converting boolean values to true/false
        if(resource[0].completed === 0){  
            return { ...resource[0], completed: false} //resource collection always has length = 1
        } else {
            return{ ...resource[0], completed: true}
        }
    })
    .then(success => {
        //display new resource
        res.status(201).json(success)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})


module.exports = router;