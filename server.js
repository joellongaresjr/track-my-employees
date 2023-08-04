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

const viewAllRoles = async () => {
  try {
    const [results] = await db
      .promise()
      .query(
        "SELECT role.department_id AS id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id;"
      );
    console.log("****** LIST OF YOUR ROLES ******");
    console.table(results);
  } catch (err) {
    throw err;
  }
  promptUser();
};

const viewAllEmployees = async () => {
  try {
    const [results] = await db
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
      );
    console.log("***** List OF YOUR EMPLOYEES ******");
    console.table(results);
  } catch (err) {
    throw err;
  }
  promptUser();
};

const addNewDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department you wish to add?",
      },
    ])
    .then(async (answer) => {
      try {
        const departmentName = answer.departmentName;
        await db.promise.query(
          `INSERT INTO department (name) VALUES ('${departmentName}')`
        );
        console.log(`${departmentName} added to department list`);
        promptUser();
      } catch (err) {
        console.error(err);
      }
    });
};

const addNewRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What role do you want to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?",
      },
    ])
    .then((answer) => {
      const roleName = answer.roleName;
      const salary = answer.salary;

     
      const roleSql = `SELECT name, id FROM department`;

      db.query(roleSql, (err, data) => {
        if (err) throw err;

        const departmentChoices = data.map(({ name, id }) => ({
          name: name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "departmentId",
              message: "What department is this role in?",
              choices: departmentChoices,
            },
          ])
          .then((deptChoice) => {
            const departmentId = deptChoice.departmentId;

            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

            db.query(sql, [roleName, salary, departmentId], (err, result) => {
              if (err) throw err;
              console.log(`Added ${roleName} to roles!`);

             
              promptUser();
            });
          });
      });
    });
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
