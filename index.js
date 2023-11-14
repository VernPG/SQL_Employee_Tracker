// const express = require('express');
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "Molly2112!",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);
connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});
afterConnection = () => {
  console.log("*****************************");
  console.log("*                           *");
  console.log("*    EMPLOYEE TRACKER       *");
  console.log("*                           *");
  console.log("*****************************");
  // init();
};

const init = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    // add all question repsonses
    .then((answers) => {
      const { choices } = answers;
      // console.log(choices, answers);
      if (choices === "view all departments") {
        showDepartments();
      }
      if (choices === "view all roles") {
        showRoles();
      }
      if (choices === "view all employees") {
        showEmployees();
      }
      if (choices === "add a department") {
        addDepartment();
      }
      if (choices === "add a role") {
        addRole();
      }
      if (choices === "add an employee") {
        addEmployee();
      }
      if (choices === "update an employee role") {
        updateEmployee();
      }
    });
};
//works
showDepartments = () => {
  console.log;
  ("Show departments");
  const sql = `SELECT * FROM department`;

  connection
    .promise()
    .query(sql)
    .then((data) => {
      console.table(data[0]);
      init();
    })
    .catch((err) => console.log(err));
};
//works
showRoles = () => {
  console.log;
  ("Show role");
  const sql = `SELECT * FROM role`;

  connection
    .promise()
    .query(sql)
    .then((data) => {
      console.table(data[0]);
      init();
    })
    .catch((err) => console.log(err));
};
//works
showEmployees = () => {
  console.log;
  ("Show employee");
  const sql = `SELECT * FROM employee`;

  connection
    .promise()
    .query(sql)
    .then((data) => {
      console.table(data[0]);
      init();
    })
    .catch((err) => console.log(err));
};
//works
addDepartment = () => {
  const sql = `INSERT INTO department (name) VALUES (?)`;
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "Please type in a department would you like to add?",
      },
    ])
    .then((answers) => {
      console.log(answers);

      connection
        .promise()
        .query(sql, answers.deptName)
        .then((data) => {
          console.table(data[0]);
          init();
        })
        .catch((err) => console.log(err));
    });
};
//works
addRole = async () => {
  const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
  const departmentsData = await connection
    .promise()
    .query("Select * from department");
  console.log(departmentsData);
  let formattedData = [];
  for (let i = 0; i < departmentsData[0].length; i++) {
    formattedData.push({
      name: departmentsData[0][i].name,
      value: departmentsData[0][i].id,
    });
  }
  console.log(formattedData);
  inquirer
    .prompt([
      {
        name: "department_id",
        type: "list",
        message:
          "Please select a department you would like to add the new role?",
        choices: formattedData,
      },
      {
        name: "title",
        type: "input",
        message: "What is the title name for the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the new role?",
      },
    ])
    .then((answers) => {
      console.log(answers);

      connection
        .promise()
        .query(sql, [answers.title, answers.salary, answers.department_id])
        .then((data) => {
          console.table(data[0]);
          init();
        })
        .catch((err) => console.log(err));
    });
};

addEmployee = async () => {
  const sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)`;
  
  const roleData = await connection.promise().query("Select * from role");
  console.log("employees", roleData);
  let formattedRoleData = [];
  for (let i = 0; i < roleData[0].length; i++) {
    formattedRoleData.push({
      name: roleData[0][i].title,
      value: roleData[0][i].id,
    });
  }
  console.log(formattedRoleData);

  const [employeeData] = await connection
    .promise()
    .query("Select * from employee");
  const formattedEmployeeData = employeeData.map((emp) => ({
    name: emp.first_name + " " + emp.last_name,
    value: emp.id,
  }));

  inquirer
    .prompt([
      {
        name: "role_id",
        type: "list",
        message:
          "Please select a role you would like to assign the new employee?",
        choices: formattedRoleData,
      },
      {
        name: "first_name",
        type: "input",
        message: "What is the first name for the new employee?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name for the new employee?",
      },
      {
        name: "manager_id",
        type: "list",
        message: "Which department manager will the employee report to?",
        choices: formattedEmployeeData,
      },
    ])
    .then((answers) => {
      console.log(answers);

      connection
        .promise()
        .query(sql, [
          answers.first_name,
          answers.last_name,
          answers.manager_id,
          answers.role_id,
        ])
        .then((data) => {
          console.table(data[0]);
          init();
        })
        .catch((err) => console.log(err));
    });
};

updateEmployee = async () => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = (?)`;
  const employeesData = await connection.promise().query("Select * from role");
  console.log(employeesData);
  let formattedData = [];
  for (let i = 0; i < employeesData[0].length; i++) {
    formattedData.push({
      name: employeesData[0][i].title,
      value: employeesData[0][i].id,
    });
  }
  
  const [employeeData] = await connection
  .promise()
  .query("Select * from employee");
const formattedEmployeeData = employeeData.map((emp) => ({
  name: emp.first_name + " " + emp.last_name,
  value: emp.id,
}));
  console.log("formatted", formattedData);
  inquirer
    .prompt([
      {
        name: "updateEmp",
        type: "list",
        message: "Please select a employee you would like to add the new role?",
        choices: formattedEmployeeData
      },
      {
        name: "title",
        type: "list",
        message: "Please select a title for the new employee?",
        choices: formattedData,
      },
    ])
    .then((answers) => {
      console.log(answers);

      connection
        .promise()
        .query(sql, [
          answers.title, answers.updateEmp
        ])
        .then((data) => {
          console.table(data[0]);
          init();
        })
        .catch((err) => console.log(err));
    });
};

init();
