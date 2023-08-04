-- Dept Data
INSERT INTO deparment (name)
        ("Operations"),
        ("IT Department"),
        ("Human Resources"),
        ("Accounting Department"),
        ("Marketing Department"),


-- Role Data
-- Operations -- Boss
INSERT INTO role (title, salary, department_id) VALUES ("Chief Operating Officer", 200000, 1)
-- Marketing Dept
INSERT INTO role (title, salary, department_id) VALUES ("Marketing Manager", 90000, 2)
INSERT INTO role (title, salary, department_id) VALUES ("Content Specialist", 75000, 2)
INSERT INTO role (title, salary, department_id) VALUES ("Marketing Analyst", 75000, 2)

-- IT Department 
INSERT INTO role (title, salary, department_id) VALUES ("IT Manager", 125000, 3)
INSERT INTO role (title, salary, department_id) VALUES ("Network Admin", 100000, 3)
INSERT INTO role (title, salary, department_id) VALUES ("System Analyst", 100000, 3)

-- Accounting Department 
INSERT INTO role (title, salary, department_id) VALUES ("Accounting Manager", 125000, 4)
INSERT INTO role (title, salary, department_id) VALUES ("Financial Analyst", 100000, 4)
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 80000, 4)

-- Human Resources 
INSERT INTO role (title, salary, department_id) VALUES ("HR Manager", 90000, 5)
INSERT INTO role (title, salary, department_id) VALUES ("Recruitment Specialist", 75000, 5)
INSERT INTO role (title, salary, department_id) VALUES ("HR Rep", 75000, 5)


-- Managers
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Joel', 'Longares', 1, null)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Song',2, null)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith',3, null)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Keili', 'Nguyen',4, null)
-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Matthew', 'Greathouse', 5, 2)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alec', 'Paule', 6, 2)

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kobe', 'Bryant', 7, 3)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Stephanie', 'Hou',8, 3)

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Faye', 'Acosta', 9, 4)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Luke', 'Skywalker', 10, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ica', 'Yamaguchi',11, 5)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Timothy', 'Kim',12, 5)


