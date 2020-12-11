// build your `Project` model here
const db = require("../../data/dbConfig");

module.exports = {
    getAllProjects() {
      return db("projects").select("*")
    },

    async getProjectById(id) {

      const results = await db("projects").select("*").where({ id: id });

      if(results.length > 0){
        return results
      } else{
        return Promise.reject(new Error('project with that id does not exist (im inside project model)'))
      }

    },

    addNewProject(newProjectObj) {
      let { name, description, completed } = newProjectObj;

      if(!completed) { completed = false} //gotta be a better way

      return db("projects").insert({ name: name, description: description, completed: completed})
    }
    
  }