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
        res.status(201).json(newResource[0]) //collection has length =1, so why not display just that obj.
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})


module.exports = router;