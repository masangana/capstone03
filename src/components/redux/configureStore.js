import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import detailsSlice from './DetailsSlice';

const store = configureStore({
  reducer: {
    preview: detailsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;