-- @block Organizations Table
-- ========================================
-- Organizations Table
-- ========================================
CREATE TABLE IF NOT EXISTS organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(200) UNIQUE NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- @block Query
SELECT * FROM organizations;

-- @block Insert Organizations
INSERT INTO organizations (name, description, contact_email, logo_filename) 
VALUES 
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- @block Verify
SELECT * FROM organizations;

-- @block Projects Table
-- ========================================
-- Projects Table
-- ========================================
CREATE TABLE IF NOT EXISTS projects (
    project_id      SERIAL PRIMARY KEY,
    organization_id INTEGER,
    title           VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    location        VARCHAR(255) NOT NULL,
    date            DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);

-- @block Verify
SELECT * FROM projects;

-- @block Insert Projects
INSERT INTO projects (organization_id, title, description, location, date) VALUES
(1, 'Digital Transformation', 'Modernization of internal processes through technology', 'New York, USA', '2026-01-15'),
(1, 'Customer Portal', 'Development of a self-service portal for end users', 'New York, USA', '2026-03-10'),
(1, 'Employee Wellness Program', 'Initiative to promote health and well-being among employees', 'New York, USA', '2026-09-01'),
(1, 'AI Customer Assistant', 'Implementation of an AI-powered customer support system', 'New York, USA', '2026-11-12'),
(1, 'Data Analytics Dashboard', 'Real-time reporting and KPI visualization platform', 'New York, USA', '2026-06-01'),

(2, 'Supply Chain Optimization', 'Automation of logistics and inventory management', 'Chicago, USA', '2026-02-20'),
(2, 'HR Management System', 'Centralized platform for human resources operations', 'Chicago, USA', '2026-04-05'),
(2, 'Community Garden Project', 'Creating and maintaining community gardens in urban areas', 'Chicago, USA', '2024-08-15'),
(2, 'Recycling Drive', 'Organizing a city-wide recycling initiative to reduce waste', 'Chicago, USA', '2024-09-10'),
(2, 'Volunteer Coordination App', 'Application to manage volunteers and community events', 'Chicago, USA', '2026-10-18'),

(3, 'Cloud Migration', 'Migration of on-premise infrastructure to cloud services', 'Austin, USA', '2026-01-30'),
(3, 'Cybersecurity Audit', 'Full assessment and hardening of company security systems', 'Austin, USA', '2026-05-12'),
(3, 'Online Marketplace Expansion', 'Expansion of e-commerce services with integrated payment systems', 'Austin, USA', '2026-08-01'),
(3, 'Tech Education Workshops', 'Providing free technology education workshops for underserved communities', 'Austin, USA', '2024-10-05'),
(3, 'Shelter Renovation Initiative', 'Renovation and improvement of local community shelters', 'Austin, USA', '2026-12-03');

-- @block Verify
SELECT
    p.project_id,
    p.title,
    p.date,
    o.name AS organization_name
FROM projects p
JOIN organizations o
ON p.organization_id = o.organization_id
ORDER BY p.date;

-- @block Categories Table
-- ========================================
-- Categories Table
-- ========================================
CREATE TABLE IF NOT EXISTS categories (
    category_id   SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL UNIQUE
);

-- @block Verify
ALTER TABLE categories ADD COLUMN description TEXT;

-- @block Insert Categories description
UPDATE categories SET description = 'Projects focused on environmental conservation and sustainability.' WHERE category_id = 1;
UPDATE categories SET description = 'Projects aimed at providing educational resources and workshops.' WHERE category_id = 2;
UPDATE categories SET description = 'Projects that support and strengthen local communities.' WHERE category_id = 3;
UPDATE categories SET description = 'Projects promoting health, wellness, and quality of life.' WHERE category_id = 4;

-- @block Verify
SELECT * FROM categories;


-- @block project_categories Table
-- ========================================
-- project_categories Table
-- ========================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id    INTEGER,
    category_id   INTEGER,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- @block Verify
SELECT * FROM project_categories;

-- @block Insert Categories
INSERT INTO categories (name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

-- @block Insert project_categories
INSERT INTO project_categories (project_id, category_id) VALUES
(1, 2), 
(2, 3), 
(3, 1), 
(4, 2), 
(5, 4), 
(6, 3), 
(7, 1), 
(8, 3), 
(9, 2), 
(10, 3),
(11, 1), 
(12, 4),
(13, 2),
(14, 3), 
(15, 3); 


-- @block Verify
SELECT
    p.project_id AS ID,
    p.title AS project_title,
    c.name AS category_name
FROM projects p
JOIN project_categories pc ON p.project_id = pc.project_id
JOIN categories c ON pc.category_id = c.category_id
ORDER BY p.project_id;

-- @block Insert project_categories
INSERT INTO project_categories (project_id, category_id) VALUES
(1, 3), 
(1, 1);
