// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'test',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },


};
