const inquirer = require('inquirer');
const actions = require('./lib/actions');

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
      'add an employee',
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
        case ('Add a employee'):
          return 'addEmployee';
        case ('Update an employee role'):
          return 'updateRole';
        default:
          return '';
      }
    },
  }];

const promptQuestion = async () => {
  const result = await inquirer.prompt(questions);
  actions[result.action]();
};

promptQuestion();