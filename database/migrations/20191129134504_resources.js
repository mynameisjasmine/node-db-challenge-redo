
exports.up = function(knex) {
    return knex.schema
    .createTable('resources', tbl => {
      tbl.increments();
      
      tbl.text('name', 255)
     .notNullable()
     .unique()
     tbl.text('description', 255)
    })
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTableIfExists('resources')
  };
  
