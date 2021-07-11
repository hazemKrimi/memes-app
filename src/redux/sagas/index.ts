import { all } from 'redux-saga/effects';
import { getMemes, watchGetMemes } from './meme';

export default function* rootSaga() {
	yield all([getMemes(), watchGetMemes()]);
}
