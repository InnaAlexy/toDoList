import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.css';
import { ControlPanel, Todo } from './components';
import { readTodo } from './api';
import { selectSearchPrase, selectSorting, selectTodos } from './selectors';
import { UPDATE_TODO } from './actions';

export const App = () => {
	const searchPhrase = useSelector(selectSearchPrase);
	const isAlphabetSorting = useSelector(selectSorting);
	const todos = useSelector(selectTodos);
	const dispatch = useDispatch();

	const getTodosFromServer = () => {
		return (dispatch) => {
			readTodo(searchPhrase, isAlphabetSorting).then((jsonData) => {
				dispatch({
					type: 'GET_TODOS_FROM_SERVER',
					payload: jsonData,
				});
			});
		};
	};

	useEffect(() => dispatch(getTodosFromServer()), []);

	useEffect(() => {
		readTodo(searchPhrase, isAlphabetSorting).then((jsonData) =>
			dispatch(UPDATE_TODO(jsonData)),
		);
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div className={styles.app}>
			<ControlPanel />
			<div>
				{todos.map(({ id, title, completed, isEditing = false }) => (
					<Todo
						key={id}
						id={id}
						title={title}
						completed={completed}
						isEditing={isEditing}
					/>
				))}
			</div>
		</div>
	);
};
