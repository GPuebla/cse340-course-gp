import express from 'express';

import { showHomePage } from '../controllers/index.js';
import { showOrganizationsPage ,
     showOrganizationDetailsPage,
      showNewOrganizationForm,
       processNewOrganizationForm,
        organizationValidation,
         showEditOrganizationForm,
          processEditOrganizationForm } from '../controllers/organizations.js';
import { showProjectsPage, 
     showProjectDetailsPage,
      showNewProjectForm,
      projectValidation,
       processNewProjectForm,
        showEditProjectForm,
         processEditProjectForm } from '../controllers/projects.js';
import { showCategoriesPage,
          showAssignCategoriesForm ,
          processAssignCategoriesForm,
          showNewCategoryForm,
          categoryValidation,
          processNewCategoryForm,
          showEditCategoryForm,
          processEditCategoryForm,
           showCategoryDetailsPage } from '../controllers/categories.js';
import { testErrorPage } from '../controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);


router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
// Route for new project page
router.get('/project/:projectId/assign-categories', showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', processAssignCategoriesForm);
// Route to handle new project form submission
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/edit-project/:projectId', showEditProjectForm);
router.post('/edit-project/:projectId', projectValidation, processEditProjectForm);


router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm); 



// error-handling routes
router.get('/test-error', testErrorPage);

export default router;