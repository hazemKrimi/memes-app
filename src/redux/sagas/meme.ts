import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getAllMemes, setMemes } from '../slices/meme';
import { Meme } from '../types';

type MemeRespone = {
	data: { success: boolean; data: { memes: Array<Meme> } };
};

function getMemesRequest() {
	return axios.get<MemeRespone>('https://api.imgflip.com/get_memes');
}

export function* getMemes() {
	try {
		const res: MemeRespone = yield call(getMemesRequest);
		yield put(setMemes(res.data.data.memes));
	} catch (error) {
		console.error(error);
	}
}

export function* watchGetMemes() {
	yield takeEvery(getAllMemes.type, getMemes);
}
