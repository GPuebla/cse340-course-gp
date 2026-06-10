import { validationResult } from 'express-validator';
// Import any needed model functions
import {
    getAllCategories, getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    updateCategory,
    createCategory
} from '../models/categories.js';
import { getProjectDetailsById } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Category name must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Category description is required')
        .isLength({ max: 500 })
        .withMessage('Category description cannot exceed 500 characters'),
];

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';
    res.render('category', { title, projects, category });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetailsById(projectId);
    const Categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';
    res.render('assign-categories', { title, projectId, projectDetails, Categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const showNewCategoryForm = async (req, res) => {
    const title = 'Create New Category';
    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const { name, description } = req.body;
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        // Redirect back to the new category form
        return res.redirect('/new-category');
    }
    try {
        const categoryId = await createCategory(name, description);
        req.flash('success', 'Category added successfully!');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error creating category:', error);
        req.flash('error', 'Failed to add category.');
        res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.category_id;
    const category = await getCategoryById(categoryId);


}

const processEditCategoryForm = async (req, res) => { }

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    categoryValidation,
    processNewCategoryForm,
    showEditCategoryForm,
    categoryValidation,
    processEditCategoryForm
};