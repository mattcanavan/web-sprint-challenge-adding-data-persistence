// build your `Resource` model here
const db = require('../../data/dbConfig');

module.exports = {
    getAllResources() {
      return db("resources").select("*")
    },

    getById(id){
      return db("resources").select("*").where({ id: id })
    },

    addNewResource(resourceObj){
      return db("resources").insert({
        //key: column_name, value: value
        name: resourceObj.name,
        description: resourceObj.description
        })
    }
    
  }