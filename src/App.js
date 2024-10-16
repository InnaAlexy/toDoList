import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { ControlPanel, Todo } from './components';
import { readTodo, deleteTodo, updateTodo, createTodo } from './api';
import { addTodoInTodos, findTodo, removeTodo, setTodoInTodos } from './utils';
import { NEW_TODO_ID } from './constants';
import { Task } from './components/Task';
import { NotFound } from './components/NotFound/NotFound';
import { StartList } from './components/StartList/StartList';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);
	const navigate = useNavigate();

	const onTodoAdd = () => {
		setTodos(addTodoInTodos(todos));
	};

	const onTodoSave = (todoId) => {
		const { title, completed } = findTodo(todos, todoId) || {};

		if (title !== '') {
			if (todoId === NEW_TODO_ID) {
				createTodo({ title, completed }).then((todo) => {
					let updatedTodos = setTodoInTodos(todos, {
						id: NEW_TODO_ID,
						isEditing: false,
					});
					updatedTodos = removeTodo(updatedTodos, NEW_TODO_ID);
					updatedTodos = addTodoInTodos(updatedTodos, todo);
					setTodos(updatedTodos);
				});
			} else {
				updateTodo({ id: todoId, title }).then(() => {
					setTodos(setTodoInTodos(todos, { id: todoId, isEditing: false }));
				});
			}
		}
	};

	const onTodoEdit = (id) => {
		setTodos(setTodoInTodos(todos, { id, isEditing: true }));
	};

	const onTodoTitleChange = (id, newTitle) => {
		setTodos(setTodoInTodos(todos, { id, title: newTitle }));
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		});
	};

	const onTodoRemove = (id) => {
		deleteTodo(id).then(() => setTodos(removeTodo(todos, id)));
	};

	useEffect(() => {
		readTodo(searchPhrase, isAlphabetSorting).then((jsonData) => setTodos(jsonData));
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<div>
			<div className={styles.app}>
				<ControlPanel
					onTodoAdd={onTodoAdd}
					onSearch={setSearchPhrase}
					onSorting={setIsAlphabetSorting}
				/>
				<div>
					<ul>
						{todos.map(({ id, title, completed, isEditing = false }) => (
							<li key={id}>
								<NavLink to={`/task/${id}`}>
									<Todo
										key={id}
										id={id}
										title={title}
										completed={completed}
										isEditing={isEditing}
										onTitleChange={(newTitle) =>
											onTodoTitleChange(id, newTitle)
										}
										onCompletedChange={(newCompleted) =>
											onTodoCompletedChange(id, newCompleted)
										}
										onSave={() => onTodoSave(id)}
										onCancel={() => onTodoRemove(id)}
									/>
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.restart}>
					<NavLink to="/"> RESTART </NavLink>
				</div>
			</div>
			<div className={styles.taskPage}>
				<Routes>
					{todos.map(({ id, title, completed, isEditing = false }) => {
						return (
							<Route
								path={`/task/${id}`}
								element={
									<Task
										title={title}
										isEditing={isEditing}
										onTitleChange={(newTitle) =>
											onTodoTitleChange(id, newTitle)
										}
										onEdit={() => onTodoEdit(id)}
										onCompletedChange={(newCompleted) =>
											onTodoCompletedChange(id, newCompleted)
										}
										onSave={() => onTodoSave(id)}
										onRemove={() => onTodoRemove(id)}
										navigate={() => navigate(-1)}
									/>
								}
							/>
						);
					})}

					<Route
						path="*"
						element={<NotFound navigate={() => navigate(-1)} />}
					/>
					<Route path="/" element={<StartList />} />
				</Routes>
			</div>
		</div>
	);
};
