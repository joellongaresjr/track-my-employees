const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "machobox1234",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

db.connect((err) => {
  if (err) {
    console.error("error connectecting to this motherfucking database", err);
    return;
  }
  console.log("connected to this motherfucking database", err);
  promptUser();
});

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Please select one of the following:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an Employee",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      const { choice } = answers;

      switch (choice) {
        case "View all departments":
          viewAllDepartments();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "Add a department":
          addNewDepartment();
          break;

        case "Add a role":
          addNewRole();
          break;

        case "Add an employee":
          addNewEmployee();
          break;

        case "Update an Employee":
          updateEmployee();
          break;

        case "Exit":
          console.log("Peace out!");
          db.end();
          break;

        default:
          console.log("Invalid choice. Please try again.");
          promptUser();
          break;
      }
    });
};

const viewAllDepartments = async () => {
  try {
    const [results] = await db.promise().query("SELECT * from department;");

    console.log("");
    console.log("***** LIST OF YOUR DEPARTMENTS *****");
    console.log("");
    console.table(results);
  } catch (err) {
    throw err;
  }
  promptUser();
};

const viewAllRoles = () => {};

const viewAllEmployees = () => {
  //query database *async
  //display results
  //return to main menu
};

const addNewDepartment = () => {};

const addNewRole = () => {
  //ask name of the role
  //ask the salary
  //query the department *async for every qury
  //ask deaprtment with list of choices
  //write new data to db
  // extract department ID**
  //return confirmation message
  //return to main menu
};

const addNewEmployee = () => {
  // ask for first and last name of employee you are adding
  // ask for employees role use [Choices]
  // in order to execut this, must querly foles first and show in m/c list.
  // Ask if employee has manager
  // query employees and display multiple choice
};

const updateEmployee = () => {};
// first
// last
// query list of employees
// select employee you want to update
// do you want to update this employee
// query titles
// have option to change role/department/ delete
// who is the manager?
// list of managers
