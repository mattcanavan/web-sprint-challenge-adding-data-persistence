// build your `Task` model here
const db = require('../../data/dbConfig');

module.exports = {
    getAllTasks() {
      // select * from tasks
      // join projects on projects.id = tasks.project_id
      return db("tasks")
      .join("projects", "projects.id", "tasks.project_id")
      .select("*")
    },

    getTaskById(id) {
      return db("tasks")
      .where({ id: id })
      .select("*")
    },

    addNewTask(newTaskObj) {
      let { 
        description, //required
        notes,
        completed, 
        project_id  //required
      } = newTaskObj;

      if(!completed) { completed = false} //gotta be a better way

      return db("tasks").insert({ description: description, notes: notes, completed: completed, project_id: project_id})
    }
    
  }