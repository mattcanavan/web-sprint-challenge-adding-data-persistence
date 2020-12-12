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
      let { name, description, completed } = newProjectObj;

      if(!completed) { completed = false} //gotta be a better way

      return db("projects").insert({ name: name, description: description, completed: completed})
    }
    
  }