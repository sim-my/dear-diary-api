
exports.up = function(knex) {
    return knex.schema.createTable('post', table => {
        table.increments('id');
        table.integer('userId').references('id').inTable('user').onDelete('CASCADE');
        table.string('date').notNullable();
        table.string('title').notNullable();
        table.text('story','longtext').notNullable();
        table.timestamps(true, true);
    });
  
  
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('todo');
  };
  