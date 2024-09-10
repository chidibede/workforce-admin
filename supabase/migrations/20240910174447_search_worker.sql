
CREATE TYPE PersonWithAttendance AS (
    id INT,
    identifier TEXT,
    firstname TEXT,
    lastname TEXT,
    fullname TEXT,
    department TEXT,
    team TEXT,
    ispresentawakeningone BOOLEAN,
    ispresentawakeningtwo BOOLEAN,
    ispresentawakeningthree BOOLEAN
);

CREATE OR REPLACE FUNCTION get_search_results(search_text TEXT)
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
        p.ispresentawakeningone,
        p.ispresentawakeningtwo,
        p.ispresentawakeningthree
    FROM 
        person p
    WHERE 
        p.firstname ILIKE '%' || search_text || '%'
        OR p.lastname ILIKE '%' || search_text || '%'
        OR p.phonenumber ILIKE '%' || search_text || '%'
        OR p.fullname ILIKE '%' || search_text || '%'
$$;
