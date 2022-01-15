const db = require('../db/connection');

const getEmployeeNames = () => {
  const sql = 'SELECT first_name, last_name FROM employees';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const getRoleNames = () => {
  const sql = 'SELECT title FROM employees';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

module.exports = { getEmployeeNames, getRoleNames };
