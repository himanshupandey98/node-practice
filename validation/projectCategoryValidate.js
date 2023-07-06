const { body, validationResult } = require('express-validator');

const projectCategoryValidate = [
   body('category').notEmpty().withMessage('Project Category is required'),
   
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
module.exports = {
    projectCategoryValidate: projectCategoryValidate,
    projectCategoryValidateErrors: handleValidationErrors
}

