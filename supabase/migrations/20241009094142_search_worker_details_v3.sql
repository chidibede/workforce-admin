
CREATE TYPE PersonWithDepartmentAndAttendanceV3 AS (
    id INT,
    identifier TEXT,
    firstname TEXT,
    lastname TEXT,
    fullname TEXT,
    department TEXT,
    team TEXT,
    ispresent BOOLEAN,
    program TEXT
);

CREATE OR REPLACE FUNCTION get_search_results_v3(search_text TEXT)
RETURNS SETOF PersonWithDepartmentAndAttendanceV3
LANGUAGE sql
AS $$
    SELECT 
        p.id, 
        p.identifier, 
        p.firstname, 
        p.lastname, 
        p.fullname, 
        p.department, 
        p.team,
        a.ispresent,
        a.program
    FROM 
        person p
    LEFT JOIN 
        attendance a ON p.id = a.personid
    WHERE 
        (p.firstname ILIKE '%' || search_text || '%'
        OR p.lastname ILIKE '%' || search_text || '%'
        OR p.phonenumber ILIKE '%' || search_text || '%'
        OR p.fullname ILIKE '%' || search_text || '%')
        AND a.program = 'Awakening'
$$;
