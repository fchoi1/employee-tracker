const inquirer = require('inquirer');
const actions = require('./lib/actions');
const utils = require('./utils');

const questions = [
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

const roleQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the role title',
  }, {
    type: 'number',
    name: 'salary',
    message: 'Enter the role salary',
  }, {
    type: 'number',
    name: 'department_id',
    message: 'Enter the department number associated with the role',
  }];

const departmentQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the department name',
  }];

const employeeQuestions = [
  {
    type: 'input',
    name: 'first_name',
    message: 'Enter employee first name',
  }, {
    type: 'input',
    name: 'last_name',
    message: 'Enter employee last name',
  }, {
    type: 'number',
    name: 'role_id',
    message: 'Enter the role id',
  }, {
    type: 'input',
    name: 'manager_id',
    message: 'Enter the manager id',
  }];

const updateRoleQuestions = [{
  type: 'input',
  name: 'employee_id',
  message: 'Enter employee id',
}, {
  type: 'input',
  name: 'role_id',
  message: 'Enter new role id',
}];

const endApp = [
  {
    type: 'confirm',
    name: 'isDone',
    default: false,
    message: 'Done with the app?',
  }];

const paramsQuestions = {
  addDepartment: departmentQuestions,
  addRole: roleQuestions,
  addEmployee: employeeQuestions,
  updateRole: updateRoleQuestions,
};

const getParams = (action) => ((paramsQuestions[action]) ? {
  action,
  prompt: inquirer.prompt(paramsQuestions[action]),
} : {
  action,
  prompt: Promise.resolve({}),
});

const promptQuestion = () => {
  inquirer.prompt(questions).then((result) => getParams(result.action))
    .then((params) => {
      actions[params.action](Object.values(params.prompt));
      return inquirer.prompt(endApp);
    })
    .then((isDone) => {
      console.log(isDone);
      if (isDone) {
        console.log('here', isDone);
      } else {
        promptQuestion();
      }
    });

  console.log(isDone);
};

promptQuestion();
console.log('broken');
