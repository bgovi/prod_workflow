-- Create a table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Insert sample data
INSERT INTO items (name) VALUES ('Sample Item 1'), ('Sample Item 2');