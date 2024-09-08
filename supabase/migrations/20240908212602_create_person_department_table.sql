CREATE TABLE Person_Department (
    personId INT,
    departmentId INT,
    assignedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (personId, departmentId),
    FOREIGN KEY (personId) REFERENCES Person(id) ON DELETE CASCADE,
    FOREIGN KEY (departmentId) REFERENCES Department(id) ON DELETE CASCADE
);
