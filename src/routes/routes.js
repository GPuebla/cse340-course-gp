import express from 'express';

import { showHomePage } from '../controllers/index.js';
import { showOrganizationsPage , showOrganizationDetailsPage, showNewOrganizationForm} from '../controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from '../controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from '../controllers/categories.js';
import { testErrorPage } from '../controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organizations/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);


router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);


// error-handling routes
router.get('/test-error', testErrorPage);

export default router;