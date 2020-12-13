// build your `Task` model here
const db = require('../../data/dbConfig');

module.exports = {
    getAllTasks() {
      // select * from tasks
      // join projects on projects.id = tasks.project_id
      return db("tasks as t")
      .join("projects as p", "p.id", "t.project_id")
      .select(
        "t.id", 
        "t.notes", 
        "t.description", 
        "t. completed", 
        "t.project_id", 
        "p.name as project_name", 
        "p.description as project_description")
    },

    getTaskById(id) {
      return db("tasks")
      .where({ id: id })
      .select("*")
    },

    addNewTask(newTaskObj) {
      return db("tasks")
      .insert({ 
        //key: column name; value: value.
        description: newTaskObj.description, 
        notes: newTaskObj.notes, 
        completed: newTaskObj.completed, 
        project_id: newTaskObj.project_id
      })
    }
    
  }