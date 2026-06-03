// Import any needed model functions
import { getAllProjects, getProjectDetailsById, getUpcomingProjects } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('project', { title, projects });
};

// Define a controller function for showing project details (if needed)
const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetailsById(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails });
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };