import { userSchema } from './schemas/userSchema.js';
import { httpStatusCode } from '../enums/httpStatusCode.js';

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
            error: error.details.map(detail => detail.message),
        });
    }
    next(); 
};
