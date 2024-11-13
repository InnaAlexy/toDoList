import { Button } from '../button/button';
import { Search, Sorting } from './components';
import styles from './controlpanel.module.css';
import { addTodoInTodos } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from '../../selectors';
import { UPDATE_TODO } from '../../actions';

export const ControlPanel = () => {
	const todos = useSelector(selectTodos);
	const dispatch = useDispatch();

	const onTodoAdd = () => {
		const newTODOS = addTodoInTodos(todos);
		dispatch(UPDATE_TODO(newTODOS));
	};

	return (
		<div className={styles.controlPanel}>
			<Search />
			<Sorting />
			<Button onClick={onTodoAdd}>✍</Button>
		</div>
	);
};
