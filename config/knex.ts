import knex from 'knex';

const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'nodemy',
    password : 'pleasefixme',
    database : 'app_todos'
  }
});

export { db };
