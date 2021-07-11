import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer as memesReducer } from './slices/meme';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		memes: memesReducer
	},
	middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
