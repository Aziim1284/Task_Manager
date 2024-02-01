import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import authslice from './authslice';
const rootReducer = combineReducers({
  todo: todoReducer,
  auth: authslice,
});

export default rootReducer;



// rootReducer.js


// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import todoReducer from './todoSlice';
// import authslice from './authslice';

// const authUserPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['auth'], // Save only the 'user' field in authUserSlice
// };

// const todoPersistConfig = {
//   key: 'todo',
//   storage,
//   whitelist: ['tasks'], // Save only the 'tasks' field in todoSlice
// };

// const rootReducer = combineReducers({
//   auth: persistReducer(authUserPersistConfig, authslice),
//   todo: persistReducer(todoPersistConfig, todoReducer),
// });

// export default rootReducer;
