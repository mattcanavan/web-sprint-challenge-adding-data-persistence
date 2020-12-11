
exports.up = function(knex) {
    return knex.schema
    .createTable("projects", (table) => {
        table.increments("id").notNullable();
        table.string("name", 128).notNullable();
        table.string("description", 128);
        table.boolean("completed").defaultTo("false"); //add back notNullable() if necessary. boolean or string?
    })

    .createTable("resources", (table) => {
        table.increments("id").notNullable();
        table.string("name", 128).unique().notNullable();
        table.string("description", 128);
    })

    .createTable("tasks", (table) => {
        table.increments("id").notNullable();
        table.string("description", 128).notNullable();
        table.string("notes", 128);
        table.boolean("completed").defaultTo("false"); //add back notNullable() if necessary. boolean or string?
        table.integer("project_id").notNullable(); //tricky tricky
    })
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects")
  
};
