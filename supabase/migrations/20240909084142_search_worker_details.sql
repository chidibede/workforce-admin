CREATE TYPE PersonWithDepartment AS (
    id INT,
    identifier Text,
    firstname Text,
    lastname Text,
    fullname Text,
    department Text,
    team Text
);

create or replace function get_search_results(search_text text)
returns setof PersonWithDepartment
language sql
as $$
select id, identifier, firstname, lastname, fullname, department, team from person where firstname ILIKE '%' || search_text || '%' OR lastname ILIKE '%' || search_text || '%' OR phonenumber ILIKE '%' || search_text || '%' OR fullname ILIKE '%' || search_text || '%'
$$