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

const getProjectsByOrganizationId = async (id) => {
    const query = `
      SELECT
        p.project_id,
        p.title,
        p.description,
        p.date,
        o.name AS organization_name
      FROM projects p
      JOIN organizations o
      ON p.organization_id = o.organization_id
      WHERE o.organization_id = $1;
    `;
    const result = await db.query(query, [id]);

    return result.rows;
}

export {getAllProjects, getProjectsByOrganizationId} 