CREATE TABLE Attendance (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    person_id INT NOT NULL,
    person_identifier VARCHAR(255) NOT NULL,
    program_name VARCHAR(100) NOT NULL,
    attended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_present BOOLEAN NOT NULL,
    FOREIGN KEY (person_id) REFERENCES Person(id) ON DELETE CASCADE
);
