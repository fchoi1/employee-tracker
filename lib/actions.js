const db = require('../db/connection');

const viewDepartments = () => {
  const sql = 'SELECT * FROM departments';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const viewRoles = () => {
  const sql = 'SELECT * FROM roles';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const viewEmployees = () => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

module.exports = { viewDepartments, viewRoles, viewEmployees };
