import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meme } from '../types';

const initialMemeState: {
	current: Meme;
	previous: Array<Meme>;
	memes: Array<Meme>;
} = {
	current: undefined,
	previous: [],
	memes: []
};

const memeSlice = createSlice({
	name: 'meme',
	initialState: initialMemeState,
	reducers: {
		getAllMemes: () => {},
		setMemes: (state, action: PayloadAction<Array<Meme>>) => ({
			...state,
			memes: action.payload,
			current: action.payload[0]
		}),
		setCurrentMeme: (state, action: PayloadAction<string>) => ({
			...state,
			previous: state.previous.length > 0 ? [state.current, ...state.previous] : [state.current],
			current: state.memes.find(meme => meme?.id === action.payload)
		}),
		setRandomMeme: state => ({
			...state,
			previous: state.previous.length > 0 ? [state.current, ...state.previous] : [state.current],
			current: state.memes[Math.floor(Math.random() * state.memes.length)]
		})
	}
});

export const { getAllMemes, setMemes, setCurrentMeme, setRandomMeme } = memeSlice.actions;
export const { reducer } = memeSlice;
