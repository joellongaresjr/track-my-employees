INSERT INTO department (name)
VALUES  ("Operations"),
        ("Marketing Department"),
        ("IT Department"),
        ("Accounting Department"),
        ("Human Resources");

INSERT INTO role (title, salary, department_id) 
VALUES
        ('Chief Operating Officer', 200000, 1),
        ('Marketing Manager', 90000, 2),
        ('Content Specialist', 75000, 2),
        ('Marketing Analyst', 75000, 2),
        ('IT Manager', 125000, 3),
        ('Network Admin', 100000, 3),
        ('System Analyst', 100000, 3),
        ('Accounting Manager', 125000, 4),
        ('Financial Analyst', 100000, 4),
        ('Accountant', 80000, 4),
        ('HR Manager', 90000, 5),
        ('Recruitment Specialist', 75000, 5),
        ('HR Rep', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
        ('Joel', 'Longares', 1, null),
        ('Mike', 'Song',2, null),
        ('John', 'Smith',3, null),
        ('Keili', 'Nguyen',4, null),
        ('Matthew', 'Greathouse', 5, 2),
        ('Alec', 'Paule', 6, 2),
        ('Kobe', 'Bryant', 7, 3),
        ('Stephanie', 'Hou',8, 3),
        ('Faye', 'Acosta', 9, 4),
        ('Luke', 'Skywalker', 10, 4),
        ('Ica', 'Yamaguchi',11, 5),
        ('Timothy', 'Kim',12, 5);


