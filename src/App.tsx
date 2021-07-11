import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getAllMemes, setCurrentMeme, setRandomMeme } from './redux/slices/meme';
import styled from 'styled-components';

const App = () => {
	const { current, previous } = useAppSelector(state => state.memes);
	const dispatch = useAppDispatch();

	const makeId = (length: number) => {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	};

	useEffect(() => {
		dispatch(getAllMemes());

		// eslint-disable-next-line
	}, []);

	return (
		<Wrapper>
			<div className='controls'>
				<button onClick={() => dispatch(setRandomMeme())}>Get a Meme</button>
				<select
					disabled={previous.length === 0}
					onChange={event => dispatch(setCurrentMeme(event.target.value))}
				>
					<option selected>Previous Memes</option>
					{previous.map(meme => (
						<option key={makeId(10)} value={meme?.id}>
							{meme?.name}
						</option>
					))}
				</select>
			</div>
			{current && current.url ? (
				<div className='meme'>
					<img alt={current.name} src={current.url} width={current.width} height={current.height} />
				</div>
			) : null}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.controls {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 3rem;
		align-items: center;
		margin-top: 20px;
	}

	.meme {
		margin-top: 20px;
	}
`;

export default App;
