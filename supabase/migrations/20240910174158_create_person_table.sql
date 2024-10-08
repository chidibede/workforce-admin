CREATE TABLE Person (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    identifier Text,
    firstname Text,
    lastname Text,
    othername Text,
    phonenumber Text,
    fullname Text,
    department Text,
    team Text,
    ispresentawakeningone BOOLEAN,
    ispresentawakeningtwo BOOLEAN,
    ispresentawakeningthree BOOLEAN,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
