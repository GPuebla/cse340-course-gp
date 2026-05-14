-- @block Organization Table
-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(200) UNIQUE NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- @block Query
SELECT * FROM organization;

-- @block Insert Organizations
INSERT INTO organization (name, description, contact_email, logo_filename) 
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
SELECT * FROM organization;

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
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

-- @block Verify
SELECT * FROM projects;

-- @block Insert Projects
INSERT INTO projects (organization_id, title, description, location, date) VALUES
    (1, 'Digital Transformation', 'Modernization of internal processes through technology', 'New York, USA', '2026-01-15'),
    (1, 'Customer Portal', 'Development of a self-service portal for end users', 'New York, USA', '2026-03-10'),
    (1, 'Data Analytics Dashboard', 'Real-time reporting and KPI visualization platform', 'New York, USA', '2026-06-01'),

    (2, 'Supply Chain Optimization', 'Automation of logistics and inventory management', 'Chicago, USA', '2026-02-20'),
    (2, 'HR Management System', 'Centralized platform for human resources operations', 'Chicago, USA', '2026-04-05'),
    (2, 'Mobile Sales App', 'Field sales tracking and order management application', 'Chicago, USA', '2026-07-15'),

    (3, 'Cloud Migration', 'Migration of on-premise infrastructure to cloud services', 'Austin, USA', '2026-01-30'),
    (3, 'Cybersecurity Audit', 'Full assessment and hardening of company security systems', 'Austin, USA', '2026-05-12'),
    (3, 'E-Commerce Platform', 'Online store with payment gateway and inventory integration', 'Austin, USA', '2026-08-01');
