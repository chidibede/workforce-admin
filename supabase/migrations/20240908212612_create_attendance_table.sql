CREATE TABLE Attendance (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    personId INT NOT NULL,
    personIdentifier VARCHAR(255) NOT NULL,
    programName VARCHAR(100) NOT NULL,
    attendedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isPresent BOOLEAN NOT NULL,
    FOREIGN KEY (personId) REFERENCES Person(id) ON DELETE CASCADE
);

SELECT 
    p.id,
    p.firstname,
    p.lastname,
    p.phonenumber,
    p.extradata,
    d.department,
    d.team
FROM 
    person p
LEFT JOIN 
    person_department pd ON p.id = pd.personid
LEFT JOIN 
    department d ON pd.departmentid = d.id
WHERE 
    p.firstname ILIKE '%' || search_text || '%'
    OR p.lastname ILIKE '%' || search_text || '%'
    OR p.phonenumber ILIKE '%' || search_text || '%'
    OR p.extradata ILIKE '%' || search_text || '%';