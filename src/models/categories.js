import db from './db.js'

const getAllCategories = async() => {
    const query = `
      SELECT name FROM categories;
    `;
    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (categoryId) => {
    const query = `
      SELECT
        category_id,
        name,
        description
      FROM categories
      WHERE category_id = $1;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
};

export { getAllCategories, getCategoryDetails };