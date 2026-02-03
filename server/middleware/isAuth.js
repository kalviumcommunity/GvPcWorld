import jwt from 'jsonwebtoken';
import { promisify } from 'node:util';
import config from '../config/index.js';
import AppError from '../util/AppError.js';
import { logger} from '../util/logger.js';

const verifyToken = promisify(jwt.verify);

export default async function isAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('Authentication required.', 401);
    }

    const token = authHeader.split(' ')[1];

    const decoded = await verifyToken(token, config.jwtSecret);

    req.user = decoded;

    const store = context.getStore();
    if (store) {
      store.set('userId', decoded.id);
    }

    logger.debug(`User identity verified and context set`);
    next();
    
  } catch (error) { // these two were most common errors
    if (error.name === 'JsonWebTokenError') return next(new AppError('Invalid token', 401)); 
    if (error.name === 'TokenExpiredError') return next(new AppError('Session expired', 401));
    
    next(error);
  }
}