import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { ControlPanel, Todo } from './components';
import { readTodo } from './api';
import { SearchContext } from './context/searchContext';
import { SortContext } from './context/sortContext';
import { TodosContext } from './context/todosContext';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	useEffect(() => {
		readTodo(searchPhrase, isAlphabetSorting).then((jsonData) => setTodos(jsonData));
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<TodosContext.Provider value={[todos, setTodos]}>
			<div className={styles.app}>
				<SearchContext.Provider value={[searchPhrase, setSearchPhrase]}>
					<SortContext.Provider
						value={[isAlphabetSorting, setIsAlphabetSorting]}
					>
						<ControlPanel />
					</SortContext.Provider>
				</SearchContext.Provider>
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
		</TodosContext.Provider>
	);
};
