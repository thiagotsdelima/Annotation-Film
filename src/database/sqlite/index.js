/* database (5º/5) --- local pra guardar os bancos de dados
   index.js --- qualquer arq. "index" serve pra, quando não se indica o arquivo que quer dentro da pasta, o VS Code busca ele por padrão */


const sqlite3 = require('sqlite3')

const sqlite = require('sqlite')

const path = require('path')


async function sqliteConnection() {

  const database = await sqlite.open({
    filename: path.resolve(__dirname, '../', 'database.db'),
    driver: sqlite3.Database
  })

  return database
}


module.exports = sqliteConnection
