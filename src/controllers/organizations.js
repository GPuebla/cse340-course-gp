// Import any needed model functions (none are needed for the home page, so this is empty)
import { getAllOrganizations } from '../models/organizations.js';

// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    
    res.render('organizations', { title, organizations });
};

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organization = await getOrganizationById(organizationId);
    const title = 'Organization Details';

    res.render('organization-details', { title, organization });
};


// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };