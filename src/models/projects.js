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
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_projects sp
        JOIN organizations o
            ON sp.organization_id = o.organization_id
        WHERE sp.date >= CURRENT_DATE
        ORDER BY sp.date ASC
        LIMIT $1
    `;

    const result = await db.query(sql, [numberOfProjects]);

    return result.rows;
}

const getProjectDetailsById = async (projectId) => {
    const sql = `
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

    const result = await db.query(sql, [projectId]);

    return result.rows[0];
};

export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetailsById} 