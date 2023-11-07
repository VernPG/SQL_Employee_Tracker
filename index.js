// const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
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
// connection.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId);
//   afterConnection();
// });
// afterConnection = () => {
//   console.log("***********************************")
//   console.log("*                                 *")
//   console.log("*        EMPLOYEE MANAGER         *")
//   console.log("*                                 *")
//   console.log("***********************************")
//   init();
// };

const init = () =>{
    inquirer.prompt([{
      name:"choices",
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
    }])
// add all question repsonses
    .then ((answers) => {
      const {choices} = answers;
      console.log(choices, answers)
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
    
};
showDepartments = () =>{
  console.log;('Show departments');
  const sql = `SELECT * FROM department`; 

  connection.promise().query(sql)
  .then(data => {
    console.table(data [0]);
    init();
  })
  .catch(err => 
    console.log(err));
}

showRoles= () =>{
  console.log;('Show role');
  const sql = `SELECT * FROM role`; 

  connection.promise().query(sql)
  .then(data => {
    console.table(data [0]);
    init();
  })
  .catch(err => 
    console.log(err));
}



showEmployees= () =>{
  console.log;('Show employee');
  const sql = `SELECT * FROM employee`; 

  connection.promise().query(sql)
  .then(data => {
    console.table(data [0]);
    init();
  })
  .catch(err => 
    console.log(err));
}
     


 addDepartment= () =>{
  const sql = `INSERT INTO department (name) VALUES (?)`
  inquirer.prompt([{
    name:"deptName",
    type:"input",
    message:"Please type in a department would you like to add?",
 
   }])
   .then(answers => {
    console.log(answers)
  
 
  connection.promise().query(sql, answers.deptName)
  .then(data => {
    console.table(data [0]);
    init();
  })
  .catch(err => 
    console.log(err));
  }) 
};



 addRole= () =>{
  const sql = `INSERT INTO role (name) VALUES (?, ?, ?)`
  inquirer.prompt([{
    name:"deptName",
    type:"input",
    message:"Please type in a department would you like to add?",
 
   }])


  
 
  connection.promise().query(sql, answers.roleName)
  .then(data => {
    console.table(data [0]);
    init();
  })
  .catch(err => 
    console.log(err));
  }
    

//  addEmployee= () =>{
//   const sql = `INSERT INTO employee (name) VALUES (?)`
//   inquirer.prompt([{
//     name:"empName",
//     type:"input",
//     message:"Please type in the employee name you would you like to add?",
 
//    }])
//    .then(answers => {
//     console.log(answers)
  
 
//   connection.promise().query(sql, [answers.empName, ])
//   .then(data => {
//     console.table(data [0]);
//     init();
//   })
//   .catch(err => 
//     console.log(err));
//   }) 
// }
      

//  updateEmployee= () =>{
//   console.log;
//   connection.promise().query(sql, (err, rows) => {
//     if (err) throw err;
//     console.table(rows);
//     promptUser();
//   });
// }



init();


// "select * from departemnt"

// loop over that data and create an array with objects containing a name(to show to users) and a value(to be selected under the hood) property
// var someArr = [{name:"HR", value: 1}]
// inquirer.prompt([{
//   name:"choices",
//   type:"list",
//   message:"What would you like to do?",
//   choices:someArr
// }])