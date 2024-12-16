import jwt from 'jsonwebtoken';
import { httpStatusCode } from '../enums/httpStatusCode.js';

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(httpStatusCode.UNAUTHORIZED).json({ message: 'Access Denied' });

    jwt.verify(token, 'secretKey', (err, user) => {
        if (err) return res.status(httpStatusCode.FORBIDDEN).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};
