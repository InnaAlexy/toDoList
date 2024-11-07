import { useContext } from 'react';
import { Button } from '../button/button';
import { Search, Sorting } from './components';
import styles from './controlpanel.module.css';
import { TodosContext } from '../../context/todosContext';
import { addTodoInTodos } from '../../utils';

export const ControlPanel = () => {
	const [todos, setTodos] = useContext(TodosContext);
	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos));
	};

	return (
		<div className={styles.controlPanel}>
			<Search />
			<Sorting />
			<Button onClick={onTodoAdd}>✍</Button>
		</div>
	);
};
