import { useContext, useState } from 'react';
import styles from './sorting.module.css';
import { Button } from '../../../button/button';
import { SortingContext } from '../../../../context/sortingContext';

export const Sorting = () => {
	const [isEnabled, setIsEnabled] = useState(false);

	const { setIsAlphabetSorting } = useContext(SortingContext);

	const onChange = ({ target }) => {
		setIsEnabled(target.checked);
		setIsAlphabetSorting(target.checked);
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
