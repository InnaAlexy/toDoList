import styles from './sorting.module.css';
import { Button } from '../../../button/button';
import { useState } from 'react';
// import { SortContext } from '../../../../context/sortContext';
import { useDispatch } from 'react-redux';
import { setIsAlphabetSorting } from '../../../../actions/setIsAlphabetSorting';

export const Sorting = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const dispatch = useDispatch();

	// const [isAlphabetSorting, setIsAlphabetSorting] = useContext(SortContext);

	const onChange = ({ target }) => {
		setIsEnabled(target.checked);
		dispatch(setIsAlphabetSorting(target.checked));
	};

	return (
		<Button>
			<input
				className={styles.checkbox}
				id="sorting-button"
				type="checkbox"
				checked={isEnabled}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor="sorting-button">
				A↓
			</label>
		</Button>
	);
};
