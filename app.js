const inquirer = require('inquirer');
const Manager = require('../team-profile-generator/lib/Manager');
const actions = require('./lib/actions');
const utils = require('./utils');

const firstQuestion = [
  {
    type: 'list',
    name: 'action',
    message: 'Select an option:',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role'],
    filter: (choice) => {
      switch (choice) {
        case ('View all departments'):
          return 'viewDepartments';
        case ('View all roles'):
          return 'viewRoles';
        case ('View all employees'):
          return 'viewEmployees';
        case ('Add a department'):
          return 'addDepartment';
        case ('Add a role'):
          return 'addRole';
        case ('Add an employee'):
          return 'addEmployee';
        case ('Update an employee role'):
          return 'updateRole';
        default:
          return '';
      }
    },
  }];

const endApp = [
  {
    type: 'confirm',
    name: 'isDone',
    default: false,
    message: 'Done with the app?',
  }];

const getRoleParams = async () => {
  const departments = await utils.getDepartmentNames();
  const roleQuestions = [
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title',
      validate: (input) => (input ? true : 'Please enter a Role'),
    }, {
      type: 'input',
      name: 'salary',
      message: 'Enter the role salary per hour',
      validate: (input) => (isNaN(input) || !input ? 'Please enter a valid Salary' : true),
    }, {
      type: 'list',
      name: 'department_name',
      choices: departments,
      message: 'Choose department',
    }];
  return inquirer.prompt(roleQuestions);
};

const getEmployeeParams = async () => {
  const roles = await utils.getRoleNames();
  const employees = await utils.getEmployeeNames();
  employees.unshift('No Manager');
  const employeeQuestions = [
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter employee first name',
      validate: (input) => (/\s/g.test(input) || !input ? 'Please enter a valid first name (no white spaces)' : true),
    }, {
      type: 'input',
      name: 'last_name',
      message: 'Enter employee last name',
      validate: (input) => (/\s/g.test(input) || !input ? 'Please enter a valid last name (no white spaces)' : true),
    }, {
      type: 'list',
      name: 'Manager',
      choices: employees,
      message: 'Select a manager',
    }, {
      type: 'list',
      name: 'role',
      choices: roles,
      message: 'Select a role',
    }];
  return inquirer.prompt(employeeQuestions);
};

const getDepartmentParams = () => {
  const departmentQuestions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name',
      validate: (input) => (input ? true : 'Please enter a Department Name'),
    }];
  return inquirer.prompt(departmentQuestions);
};

const getUpdateRoleParams = async () => {
  const roles = await utils.getRoleNames();
  const employees = await utils.getEmployeeNames();
  const updateRoleQuestions = [{
    type: 'list',
    name: 'employee_id',
    choices: employees,
    message: 'Enter employee id',
  }, {
    type: 'list',
    name: 'role_id',
    choices: roles,
    message: 'Enter new role id',
  }];
  return inquirer.prompt(updateRoleQuestions);
};

const empty = () => inquirer.prompt([]);

const paramsQuestions = {
  addDepartment: getDepartmentParams,
  addRole: getRoleParams,
  addEmployee: getEmployeeParams,
  updateRole: getUpdateRoleParams,
  viewDepartments: empty,
  viewRoles: empty,
  viewEmployees: empty,
};

const init = async () => {
  const result = await inquirer.prompt(firstQuestion);
  const params = await paramsQuestions[result.action]();
  await actions[result.action](Object.values(params));
  const app = await inquirer.prompt(endApp);
  if (app.isDone) {
    console.log('Exiting App');
    process.exit();
  } else {
    init();
  }
};

init();
