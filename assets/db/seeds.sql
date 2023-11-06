INSERT INTO department(name)
VALUES ("Sales"),
       ("Human Resources"),
       ("Operations"),
       ("Accounting");

INSERT INTO role(title, salary, department_id)
VALUES ("Sales Manager", 155000, 1),
       ("Sales Lead", 110000, 1),
       ("Legal", 95000, 3),
       ("Recruitor", 75000, 2),
       ("Trainer", 65000, 2),
       ("Designer", 100000, 3),
       ("Data Entry", 65000, 4),
       ("Accountant", 85000, 4);
       
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Ness", 1, NULL),
       ("Greg", "Graffin", 2, 1),
       ("Tim", "Armstrong", 2, 1),
       ("Stevie", "Nicks", 3, NULL),
       ("George", "Micheal", 4, NULL),
       ("Maynard", "Keenan", 5, 5),
       ("Taylor", "Swift", 5, 5),
       ("Mister", "Worldwide", 6, NULL),
       ("Tom", "Morello", 7, 8),
       ("Britney", "Spears", 7, 8);


   Error Code: 1146. Table 'tracker_db.employee' doesn't exist

