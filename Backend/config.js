const dotenv = require('dotenv');

dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

exports.JWT_USER_PASSWORD = JWT_USER_PASSWORD;
exports.JWT_ADMIN_PASSWORD= JWT_ADMIN_PASSWORD;
exports.STRIPE_SECRET_KEY = STRIPE_SECRET_KEY;