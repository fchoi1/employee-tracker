const db = require('../db/connection');

const viewDepartments = async () => {
  const sql = 'SELECT * FROM departments';
  try {
    const [rows, fields] = await db.promise().query(sql);
    console.table(rows);
  } catch (error) {
    console.log('error: ', error);
  }
};

const viewRoles = async () => {
  const sql = `SELECT r.title AS job_title, r.id AS role_id, d.name AS department, r.salary
  FROM roles AS r
  JOIN departments AS d ON r.department_id = d.id`;
  try {
    const [rows, fields] = await db.promise().query(sql);
    console.table(rows);
  } catch (error) {
    console.log('error: ', error);
  }
};

const viewEmployees = async () => {
  const sql = `SELECT e.id AS employee_id, e.first_name, e.last_name, 
    r.title AS job_title, d.name AS department, r.salary,  IfNull(e2.first_name, '')  AS reports_to
    FROM employees AS e 
    LEFT JOIN employees AS e2 ON e.manager_id = e2.id
    JOIN roles AS r ON e.role_id = r.id
    JOIN  departments AS d ON r.department_id = d.id
    ORDER BY d.name, r.salary DESC`;
  try {
    const [rows, fields] = await db.promise().query(sql);
    console.table(rows);
  } catch (error) {
    console.log('error: ', error);
  }
};

const addDepartment = async (params) => {
  const sql = 'INSERT INTO departments (name) VALUES (?);';
  try {
    const [rows, fields] = await db.promise().query(sql, params);
    console.table(rows);
  } catch (error) {
    console.log('error: ', error);
  }
};

const addRole = async (params) => {
  const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ? ,?);';
  try {
    const [rows, fields] = await db.promise().query(sql, params);
    console.log('Added new employee!');
  } catch (error) {
    console.log('error: ', error);
  }
};

const addEmployee = async (params) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ? ,?, ?)`;
  try {
    const [rows, fields] = await db.promise().query(sql, params);
    console.log("Added new employee!"); 
  } catch (error) {
    console.log('error: ', error);
  }
};

const updateRole = async (params) => {
  const sql = 'UPDATE employees SET role_id = ? WHERE id = ? ';
  try {
    const [result, fields] = await db.promise().query(sql, params);
    !result.affectedRows ? console.log('Employee not Found!') : console.log('Updated role of employee');
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateRole,
};
