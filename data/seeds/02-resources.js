exports.seed = function (knex) {
    return knex("resources").insert([
      { name: "Space Ship", 
        description: "Idk a ship with rockets."  },

      { name: "Submarine",
        description: "Donated by James Cameron." },

      { name: "Electric griddle", 
        description: "10 settings. 40in cook surface." },

      { name: "Laptop computer", 
        description: "Comes with wifi." },

      { name: "NB Shapeups", 
        description: "Your body will thank you." },

      { name: "Leasuire Reading Material", 
        description: "Mainly pulp-fiction." },
    ]);
  };
  