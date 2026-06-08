// Import any needed model functions
import { getProjectDetailsById, getUpcomingProjects, createProject } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import {getAllorganizations} from '../models/organizations.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

// Define a controller function for showing project details (if needed)
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetailsById(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails, categories});
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllorganizations();
    const title = 'Create New Project';
    
    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const { organizationId, title, description, location, date } = req.body;
    
    try {
        const projectId = await createProject(organizationId, title, description, location, date);
        req.flash('success', 'Project added successfully!');
        res.redirect(`/projects/${projectId}`); 
    } catch (error) {
        console.error('Error creating project:', error);
        req.flash('error', 'Failed to add project.');
        res.redirect('/new-project');
    }
};


// Export any controller functions
export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm };