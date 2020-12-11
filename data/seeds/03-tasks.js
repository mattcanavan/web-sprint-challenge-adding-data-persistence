exports.seed = function (knex) {
  return knex("tasks").insert([
    {
      description: "Ready the launch platform.",
      notes: "Have fun!",
      project_id: 1,
    },

    { description: "Button-down the hatches.", 
      project_id: 2 
    },

    {
      description: "Put the cheese between two pieces of bread.",
      project_id: 3,
    },

    { description: "Get a good night's sleep.", 
      project_id: 1 
    },

    { description: "Stock the galley", 
      project_id: 2 
    },
    
  ]);
};
