import {AsyncLocalStorage} from 'node:async_hooks'; // sonar-qube suggestion to use node: prefix as it asks to use in build module rather than seeking external dependency.
const asyncLocalStorage = new AsyncLocalStorage();
module.exports = {
    getStore: () =>  asyncLocalStorage.getStore(), 
    run : (store, callback) => asyncLocalStorage.run(store, callback), //now i will just use this on top level on middlewares.
};