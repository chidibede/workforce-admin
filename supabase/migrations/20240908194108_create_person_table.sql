CREATE TABLE Person (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    extra_data VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
