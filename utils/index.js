const db = require('../db/connection');

const getEmployeeNames = async () => {
  const sql = 'SELECT first_name, last_name FROM employees ORDER BY first_name';
  try {
    const [rows, fields] = await db.promise().query(sql);
    return rows.map((employee) => `${employee.first_name} ${employee.last_name} `);
  } catch (error) {
    console.log('error: ', error);
  }
};

const getRoleNames = async () => {
  const sql = 'SELECT title FROM roles ORDER BY title';
  try {
    const [rows, fields] = await db.promise().query(sql);
    return rows.map((role) => role.title);
  } catch (error) {
    console.log('error: ', error);
  }
};

const getDepartmentNames = async () => {
  const sql = 'SELECT name FROM departments ORDER BY name';
  try {
    const [rows, fields] = await db.promise().query(sql);
    return rows.map((departments) => departments.name);
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = { getEmployeeNames, getRoleNames, getDepartmentNames };
