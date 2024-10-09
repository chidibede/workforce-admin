
CREATE TYPE PersonWithAttendance AS (
    id INT,
    identifier TEXT,
    firstname TEXT,
    lastname TEXT,
    fullname TEXT,
    department TEXT,
    team TEXT,
    workerrole TEXT,
    updatedat TIMESTAMP,
    ispresent BOOLEAN
);

CREATE OR REPLACE FUNCTION get_search_results_v4(search_text TEXT)
RETURNS SETOF PersonWithAttendance
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
        p.workerrole,
        p.updatedat,
        p.ispresent
    FROM 
        person p
    WHERE 
        p.firstname ILIKE '%' || search_text || '%'
        OR p.lastname ILIKE '%' || search_text || '%'
        OR p.phonenumber ILIKE '%' || search_text || '%'
        OR p.fullname ILIKE '%' || search_text || '%'
$$;
