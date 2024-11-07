import { addTodoInTodos, findTodo, removeTodo, setTodoInTodos } from '../../utils';
import { NEW_TODO_ID } from '../../constants';
import { createTodo, deleteTodo, updateTodo } from '../../api';
import { TodosContext } from '../../context/todosContext';
import { useContext } from 'react';
import { ToDoLayout } from './todoLayout';

export const Todo = ({ id, title, completed, isEditing }) => {
	const [todos, setTodos] = useContext(TodosContext);

	const onTodoSave = (todoId) => {
		const { title, completed } = findTodo(todos, todoId) || {};

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

	return (
		<div>
			<ToDoLayout
				title={title}
				completed={completed}
				isEditing={isEditing}
				id={id}
				onTodoEdit={onTodoEdit}
				onTodoTitleChange={onTodoTitleChange}
				onTodoCompletedChange={onTodoCompletedChange}
				onTodoSave={onTodoSave}
				onTodoRemove={onTodoRemove}
			/>
		</div>
	);
};
