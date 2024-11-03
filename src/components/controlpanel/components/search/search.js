import { useContext, useState } from 'react';
import { Button } from '../../../button/button';
import styles from './search.module.css';
import { SearchContext } from '../../../../context/searchContext';

export const Search = ({ onSearch }) => {
	const [value, setValue] = useState('');
	const [searchPhrase, setSearchPhrase] = useContext(SearchContext);

	const onChange = ({ target }) => {
		setValue(target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setSearchPhrase(value);
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
