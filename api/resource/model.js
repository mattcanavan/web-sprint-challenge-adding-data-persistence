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
      const { name, description } = resourceObj;

      return db("resources").insert({ name: name, description: description})
    }
    
  }