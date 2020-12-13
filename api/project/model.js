// build your `Project` model here
const db = require("../../data/dbConfig");

module.exports = {
    getAllProjects() {
      return db("projects").select("*")
    },

    getProjectById(id) {
      //if id does not exist, empty array is returned
      return db("projects").select("*").where({ id: id });
    },

    addNewProject(newProjectObj) {
      return db("projects").insert({
        //key: column_name; value: value.
         name: newProjectObj.name, 
         description: newProjectObj.description, 
         completed: newProjectObj.completed
        })
    }
    
  }