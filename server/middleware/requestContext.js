import { context } from '../../utils/logger.js';
import crypto from 'node:crypto'; // Built-in Node module

export default function requestContext(req, res, next) {
  const store = new Map();
  
  const requestId = crypto.randomUUID();
  store.set('requestId', requestId);
  
  context.run(store, () => {
    next();
  });
}