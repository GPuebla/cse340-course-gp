import db from './db.js'

const getAllProjects = async() => {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.date,
        o.name AS organization_name
      FROM projects p
      JOIN organizations o
      ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM projects
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) =>{
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1
    `;

    const result = await db.query(sql, [numberOfProjects]);

    return result.rows;
}

const getProjectDetailsById = async (projectId) => {
    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name
        FROM projects p
        JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;

    const result = await db.query(query, [projectId]);

    return result.rows[0];
};

const createProject = async (organizationId, title, description, location, date) => {
    const query = `
        INSERT INTO projects (organization_id, title, description, location, date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id
    `;
    
    const queryParams = [organizationId, title, description, location, date];
    const result = await db.query(query, queryParams);

        if (result.rows.length === 0) {
            throw new Error('Failed to create project');
        }

        if (process.env.ENABLE_SQL_LOGGING === 'true') {
            console.log('Created new project with ID:', result.rows[0].project_id);
        }

    return result.rows[0].project_id;
};


export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetailsById, createProject} 