import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

export const context = {
  getStore: () => asyncLocalStorage.getStore(),
  run: (store, callback) => asyncLocalStorage.run(store, callback),
};