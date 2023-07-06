const { body, validationResult } = require('express-validator');

const reviewsValidate = [
    body('star_rating').notEmpty().withMessage('star rating is required').isInt({ min: 1, max: 5 }).withMessage('star rating must be an integer having values between 1 to 5'),
    body('comment').notEmpty().withMessage('comment is required').isString().withMessage('comment must be a string'),
    body('client_name').notEmpty().withMessage('client name is required').isString().withMessage('client name must be a string'),
    body('client_description').notEmpty().withMessage('client description is required').isString().withMessage('client description must be a string'),
   
   
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
module.exports = {
    reviewsValidate: reviewsValidate,
    reviewsValidateErrors: handleValidationErrors
}
