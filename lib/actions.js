const db = require('../db/connection');

const viewDepartments = () => {
  const sql = 'SELECT * FROM departments';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const viewRoles = () => {
  const sql = `SELECT r.title AS job_title, r.id AS role_id, d.name AS department, r.salary
  FROM roles AS r
  JOIN departments AS d ON r.department_id = d.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const viewEmployees = () => {
  const sql = `SELECT e.id AS employee_id, e.first_name, e.last_name, 
    r.title AS job_title, d.name AS department, r.salary,  e2.first_name AS reports_to
    FROM employees AS e 
    LEFT JOIN employees AS e2 ON e.manager_id = e2.id
    JOIN roles AS r ON e.role_id = r.id
    JOIN  departments AS d ON r.department_id = d.id
    ORDER BY d.name, r.salary DESC`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
  });
};

const addDepartment = (params) => {
  const sql = 'INSERT INTO departments (name) VALUES (?);';
  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
};

const addRole = (params) => {
  const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ? ,?);';
  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
};

const addEmployee = (params) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ? ,?, ?)`;
  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
};

const updateRole = (params) => {
  const sql = 'UPDATE employees SET role_id = ? WHERE id = ? ';
  db.query(sql, params.reverse(), (err, result) => {
    if (err) throw err;
    console.table(result);
  });
};

module.exports = {
  viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateRole,
};
