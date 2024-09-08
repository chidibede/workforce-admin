CREATE TABLE Person_Department (
    person_id INT,
    department_id INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (person_id, department_id),
    FOREIGN KEY (person_id) REFERENCES Person(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES Department(id) ON DELETE CASCADE
);
