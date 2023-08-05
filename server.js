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
// function helps us establish a connection to mysql which help us initiate 'promptUser' to our user!
db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(err);
  promptUser();
});

// using npm 'inquirer' to prompt questions to our user, 
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
      const { choice } = answers; // extracting our users choices from answers object
// applying a switch statment to help us determine the actions required to assist the user through our prompt
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
// Function that allows users to see all Depts
const viewAllDepartments = async () => {
  try {
    const [results] = await db.promise().query("SELECT * from department;"); // query select all rows from dept table

    console.log("");
    console.log("***** LIST OF YOUR DEPARTMENTS *****"); // cute way of displaying our tables to the user (kawaii desu ne)
    console.log("");
    console.table(results); 
  } catch (err) {
    throw err;
  }
  promptUser(); // mainlly used throughout our code but this prompts the user back to the main menu 
};
// Function that allows users to see all Roles
const viewAllRoles = async () => {
  try {
    const [results] = await db
      .promise()
      .query( // I hated this portion of the assignment because this query is by far too complex, but that's my fault for making my data for my tables to complex)
        "SELECT role.department_id AS id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id;"
      );// initially we use 'Inner Join' to create a relationship between deparment and role table, displaying our columns according, ex(role.department_id as id) 
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
      .query(// this most complex query of them all!! added a new sql method 'CONCAT' which allows to associate first & last name of the manager to associate with their respected employee
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
      ); // overall this query gives us the access of infomration about employees and their specific roles within the company and identifying all departments, salary, roles and corresponding managers of those employees
    console.log("***** List OF YOUR EMPLOYEES ******");
    console.table(results);
  } catch (err) {
    throw err;
  }
  promptUser();
};
// function that allows us to add a new dept to our database
const addNewDepartment = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department you wish to add?", // prompting user of what dept they wish to add
      },
    ]);
    const departmentName = answer.departmentName; // once the user provides us their information of the new dept, the 'answer' object is then extracted and stored in deptname variable
    await db
      .promise() 
      .query(`INSERT INTO department (name) VALUES ('${departmentName}')`); // once promise has been fulfilled, we then insert the new department (name) into our database 'VALUES $deptname'
    console.log(`${departmentName} added to department list`);
  } catch (err) {
    console.error(err);
  }
  promptUser();
};
// function that allows users to add a new role 
const addNewRole = async () => {
  try { // prompt our user for role & salary 
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
// extracrting answers the user provided (rolename & salary)
    const roleName = answer.roleName;
    const salary = answer.salary;
// fetch all depts from the data to allow the user to choose which dept the new role will belong to 
    const [departments] = await db
      .promise()
      .query("SELECT name, id FROM department");
// mapping our departments into an array of choices (giving that dept a name, and new coressponding id)
    const departmentChoices = departments.map(({ name, id }) => ({
      name: name,
      value: id,
    })); 
// prompting the user to select where the new role will be selected within the company (hence, deptchoice)
    const deptChoice = await inquirer.prompt([
      {
        type: "list",
        name: "departmentId",
        message: "What department is this role in?",
        choices: departmentChoices,
      },
    ]);
    const departmentId = deptChoice.departmentId; // extracting the department ID selected by the user!
// SQL template to insert the new role into the data base
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
// awaiting a promise to insert a new role into the data base from the provided values (role name, salary, & coreresponding deptid)
    await db.promise().query(sql, [roleName, salary, departmentId]);

    console.log(`Added ${roleName} to the company!`);
  } catch (err) {
    console.error(err);
  }
  promptUser();
};

// Function to that updates our employee table
const updateEmployee = async () => {
  try {
    const [employees] = await db // fetch a list of employee from our database
      .promise()
      .query("SELECT id, first_name, last_name FROM employee");

      // creating an array of choices for the user by the corresponding name/id
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
// Prompt the user to select the employee they wish to update
    const selectedEmployeeAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedEmployeeId",
        message: "Select the employee you want to update:",
        choices: employeeChoices,
      },
    ]); 
// extracting the id of the selected employee from which the user provided (once the promise has been fulfilled)
    const { selectedEmployeeId } = selectedEmployeeAnswer;
// fetching the list of roles from our database 
    const [roles] = await db.promise().query("SELECT id, title FROM role");

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
// Prompting our user to select the new role from the employee they selected
    const selectedRoleAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedRoleId",
        message: "Select the new role for the employee:",
        choices: roleChoices,
      },
    ]);
// extracting the id of the selected role from the user's answer
    const { selectedRoleId } = selectedRoleAnswer;
// once we receive this promise we then update the role of the employee in our database
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
