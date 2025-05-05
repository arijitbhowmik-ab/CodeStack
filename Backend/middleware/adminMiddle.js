const  config  = require('../config');
const jwt = require('jsonwebtoken');

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD)
        req.adminId = decoded.id
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
}

module.exports = adminMiddleware;