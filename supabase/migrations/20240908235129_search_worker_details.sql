CREATE TYPE PersonWithDepartment AS (
    id INT,
    firstname VARCHAR,
    lastname VARCHAR,
    extradata VARCHAR,
    department VARCHAR,
    team VARCHAR
);

create or replace function get_search_results_v2(search_text text)
returns setof PersonWithDepartment
language sql
as $$
select id, firstname, lastname, department, team, extradata from person where firstname ILIKE '%' || search_text || '%' OR lastname ILIKE '%' || search_text || '%' OR phonenumber ILIKE '%' || search_text || '%' OR extradata ILIKE '%' || search_text || '%'
$$