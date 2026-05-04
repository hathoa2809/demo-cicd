-- 1. Drop table if exists 
DROP TABLE IF EXISTS students;

-- 2. Create students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    score DECIMAL(4,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (name, email, score) VALUES 
('John Smith', 'john.smith@student.edu.vn', 8.5),
('David Johnson', 'david.johnson@student.edu.vn', 4.5),
('Michael Brown', 'michael.brown@student.edu.vn', 7.0)
ON CONFLICT (email) DO NOTHING;
