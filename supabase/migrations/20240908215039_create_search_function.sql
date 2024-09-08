create or replace function get_search_results(search_text text)
returns setof person
language sql
as $$
select * from person where firstname ILIKE '%' || search_text || '%' OR lastname ILIKE '%' || search_text || '%' OR phonenumber ILIKE '%' || search_text || '%' OR extradata ILIKE '%' || search_text || '%'
$$