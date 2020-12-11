exports.seed = function (knex) {
    return knex("projects").insert([
      { name: "Land on Moon",
        description: "Not because it is easy, but because it is hard." },
      
        { name: "Explore Ocean",
        description: "Purpose is to find new creatures." },
      
        { name: "Make Grilled Cheese Sandwich",
        description: "Classic grilled cheese. Quickly I'm hungry." },
    ]);
  };