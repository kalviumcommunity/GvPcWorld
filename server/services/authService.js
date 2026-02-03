import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import AppError from '../util/AppError.js';
import { logger } from '../util/logger.js';

export default function makeAuthService(userRepository) {
  return {
    register: async (name, email, password) => {
      logger.info(`Attempting to register user: ${email}`);

      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        logger.warn(`Registration failed: Email ${email} already exists`);
        throw new AppError('User already exists', 409); // 409 Conflict
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userRepository.create({ name, email, password: hashedPassword });
      
      logger.info(`User registered successfully: ${user._id}`);
      return { id: user._id, email: user.email };
    },

    login: async (email, password) => {
      logger.info(`Login attempt for: ${email}`);

      const user = await userRepository.findByEmail(email);
      if (!user) {
        logger.warn(`Login failed: Email ${email} not found`);
        throw new AppError('Invalid credentials', 401);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        logger.warn(`Login failed: Incorrect password for ${email}`);
        throw new AppError('Invalid credentials', 401);
      }

      const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
      
      logger.info(`User logged in successfully: ${user._id}`);
      return { token, user: { id: user._id, name: user.name, email: user.email } };
    }
  };
}