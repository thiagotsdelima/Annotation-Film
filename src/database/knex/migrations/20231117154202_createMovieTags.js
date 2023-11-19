
exports.up = knex =>
  knex.schema.createTable('tags', table => {
    table.increments("id");
    table.text("annotation_id");
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("tag_name").notNullable();
    
  })

exports.down = knex => knex.schema.dropTable('tags')
