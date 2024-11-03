import { Button } from '../button/button';
import { Search, Sorting } from './components';
import styles from './controlpanel.module.css';

export const ControlPanel = ({ onTodoAdd }) => {
	return (
		<div className={styles.controlPanel}>
			<Search />
			<Sorting />
			<Button onClick={onTodoAdd}>✍</Button>
		</div>
	);
};
