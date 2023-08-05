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
    console.error(err);
    return;
  }
  console.log(err);
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

const addNewDepartment = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department you wish to add?",
      },
    ]);
    const departmentName = answer.departmentName;
    await db
      .promise()
      .query(`INSERT INTO department (name) VALUES ('${departmentName}')`);
    console.log(`${departmentName} added to department list`);
  } catch (err) {
    console.error(err);
  }
  promptUser();
};

const addNewRole = async () => {
  try {
    const answer = await inquirer.prompt([
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
    ]);

    const roleName = answer.roleName;
    const salary = answer.salary;

    const [departments] = await db
      .promise()
      .query("SELECT name, id FROM department");

    const departmentChoices = departments.map(({ name, id }) => ({
      name: name,
      value: id,
    }));
    const deptChoice = await inquirer.prompt([
      {
        type: "list",
        name: "departmentId",
        message: "What department is this role in?",
        choices: departmentChoices,
      },
    ]);
    const departmentId = deptChoice.departmentId;
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    await db.promise().query(sql, [roleName, salary, departmentId]);
    console.log(`Added ${roleName} to the company!`);
  } catch (err) {
    console.error(err);
  }
  promptUser();
};

const updateEmployee = async () => {
  try {
    const [employees] = await db
      .promise()
      .query("SELECT id, first_name, last_name FROM employee");

    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    const selectedEmployeeAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedEmployeeId",
        message: "Select the employee you want to update:",
        choices: employeeChoices,
      },
    ]);

    const { selectedEmployeeId } = selectedEmployeeAnswer;

    const [roles] = await db.promise().query("SELECT id, title FROM role");

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    const selectedRoleAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedRoleId",
        message: "Select the new role for the employee:",
        choices: roleChoices,
      },
    ]);

    const { selectedRoleId } = selectedRoleAnswer;

    await db
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        selectedRoleId,
        selectedEmployeeId,
      ]);

    console.log("Employee role updated successfully!");
  } catch (err) {
    console.error("Error updating employee role:", err);
  }

  promptUser();
};
