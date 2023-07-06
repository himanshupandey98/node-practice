const express = require('express');
const router = express.Router();



// validation include
const { projectCategoryValidate, projectCategoryValidateErrors } = require('./validation/projectCategoryValidate')
const { reviewsValidate, reviewsValidateErrors } = require('./validation/reviewsValidate')

// diskStorage
const { generalUpload } = require('./config/storage/general');
const { projectUpload } = require('./config/storage/project');



// auth middleware
const { requireAuth } = require('./middleware/auth')


// controller include
const userController = require('./controller/admin/userController');
const authController = require('./controller/admin/authController');
const projectController = require('./controller/admin/projectController');
const projectCategoryController = require('./controller/admin/projectCategoryController');
const reviewsController = require('./controller/admin/reviewController');


// ---------------------------Routes-------------------------------------------------------------------------

// login
router.post('/login', authController.login);
router.post('/logout', requireAuth, authController.logout);

// users
router.get('/users', requireAuth, generalUpload, userController.getUsers);
router.post('/create/users', requireAuth, generalUpload, userController.createUsers);
router.post('/edit/users', requireAuth, generalUpload, userController.editUsers);
router.post('/update/users', requireAuth, generalUpload, userController.updateUsers);
router.post('/delete/users', requireAuth, generalUpload, userController.deleteUsers);


// project
router.get('/projects', projectController.getProjects);
router.post('/create/projects', projectUpload, projectController.createProjects);
router.post('/edit/projects', requireAuth, generalUpload, projectController.editProjects);
router.post('/update/projects', requireAuth, projectUpload, projectController.updateProjects);
router.post('/delete/projects', requireAuth, generalUpload, projectController.deleteProjects);

// project categories
router.get('/project-categories', requireAuth, projectCategoryController.getProjectCategories);
router.post('/create/project-categories', requireAuth, generalUpload, projectCategoryValidate, projectCategoryValidateErrors, projectCategoryController.createProjectCategories);
router.post('/edit/project-categories', requireAuth, generalUpload, projectCategoryController.editProjectCategories);
router.post('/update/project-categories', requireAuth, generalUpload, projectCategoryValidate, projectCategoryValidateErrors, projectCategoryController.updateProjectCategories);
router.post('/delete/project-categories', requireAuth, generalUpload, projectCategoryController.deleteProjectCategories);

// reviews
router.get('/reviews', requireAuth, reviewsController.getReviews);
router.post('/create/reviews', requireAuth, generalUpload, reviewsValidate, reviewsValidateErrors, reviewsController.createReviews);
router.post('/edit/reviews', requireAuth, generalUpload, reviewsController.editReviews);
router.post('/update/reviews', requireAuth, generalUpload, reviewsValidate, reviewsValidateErrors, reviewsController.updateReviews);
router.post('/delete/reviews', requireAuth, generalUpload, reviewsController.deleteReviews);


module.exports = router;
