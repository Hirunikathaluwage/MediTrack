import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import usersApiSlice from './slices/usersApiSlice';
// import productsApiSlice from './slices/productsApiSlice';
// import ordersApiSlice from './slices/ordersApiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    // [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    // [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // usersApiSlice.middleware,
      // productsApiSlice.middleware,
      // ordersApiSlice.middleware
    ),
});

export default store;
