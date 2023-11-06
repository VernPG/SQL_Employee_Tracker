const express = require('express');
const { default: inquirer } = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Molly2112!',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);
connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  afterConnection();
});
afterConnection = () => {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")
  promptUser();
};

const init = () =>{
    inquirer.prompt([{
      name:"view",
      type:"list",
      message:"What would you like to do?",
      choices:[
        "view all departments", 
        "view all roles", 
        "view all employees", 
        "add a department", 
        "add a role", 
        "add an employee", 
        "update an employee role"
      ]
    }
//add all question repsonses
    .then ((answers) => {
      const {choices} = answers;
       if (choices === "view all departments"){
        showDepartments();
       }
       if (choices === "view all roles"){
        showRoles();
       }
       if (choices === "view all employees"){
        showEmployees();        
       }
       if (choices === "add a department"){
        addDepartment();
       }
       if (choices === "add a role"){
        addRole();        
       }
       if (choices === "add an employee"){
        addEmployee();        
       }
       if (choices === "update an employee role"){
        updateEmployee();
       };
    })
    ])
}
init();

