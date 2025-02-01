-- Create a table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- Insert sample data
INSERT INTO items ("name") VALUES ('Sample Item 1'), ('Sample Item 2');

-- Create the Users table
CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100),
    oauth_id VARCHAR(100) UNIQUE NOT NULL
);

-- Insert fake data into the Users table
INSERT INTO "users" (first_name, last_name, username, "password", oauth_id) VALUES
    ('John', 'Doe', 'johndoe', 'password123', 'johndoe@gmail.com'),
    ('Jane', 'Smith', 'janesmith', 'password456', 'janesmith@gmail.com'),
    ('Alice', 'Johnson', 'alicejohnson', 'password789', 'alicejohnson@gmail.com'),
    ('Bob', 'Brown', 'bobbrown', 'password101', 'bobbrown@gmail.com'),
    ('Charlie', 'Davis', 'charliedavis', 'password112', 'charliedavis@gmail.com');
