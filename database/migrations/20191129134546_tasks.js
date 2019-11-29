
exports.up = function(knex) {
    return knex.schema 
    .createTable('tasks', tbl => {
       tbl.increments();
       
       tbl.text('description', 255)
       .notNullable();
       
       tbl.text('notes', 255)

       tbl
      .integer('projectId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('cascade')
      .onDelete('cascade')
   
       
       tbl.boolean('completed').default(false)
       .notNullable();
    })
    };
    
    exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks') 
    };
    