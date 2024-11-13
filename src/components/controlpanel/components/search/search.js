import { useState } from 'react';
import { Button } from '../../../button/button';
import styles from './search.module.css';
import { useDispatch } from 'react-redux';
import { setSearchPhrase } from '../../../../actions';

export const Search = () => {
	const [value, setValue] = useState('');
	const dispatch = useDispatch();

	const onChange = ({ target }) => {
		setValue(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(setSearchPhrase(value));
	};

	return (
		<form className={styles.search} onSubmit={onSubmit}>
			<input
				className={styles.input}
				type="text"
				value={value}
				placeholder="Поиск..."
				onChange={onChange}
			/>
			<Button type="submit">🔍</Button>
		</form>
	);
};
