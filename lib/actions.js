const cTable = require('console.table');
const db = require('../db/connection');

const viewDepartments = () => {
  const sql = 'SELECT * FROM departments';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    // console.log(cTable)
  });
};

module.exports = { viewDepartments };
