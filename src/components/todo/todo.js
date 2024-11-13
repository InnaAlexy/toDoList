import { addTodoInTodos, findTodo, removeTodo, setTodoInTodos } from '../../utils';
import { NEW_TODO_ID } from '../../constants';
import { createTodo, deleteTodo, updateTodo } from '../../api';
import { ToDoLayout } from './todoLayout';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from '../../selectors';
import { UPDATE_TODO } from '../../actions';

export const Todo = ({ id, title, completed, isEditing }) => {
	const todos = useSelector(selectTodos);
	const dispatch = useDispatch();

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
				dispatch(UPDATE_TODO(updatedTodos));
			});
		} else {
			updateTodo({ id: todoId, title }).then(() => {
				dispatch(
					UPDATE_TODO(setTodoInTodos(todos, { id: todoId, isEditing: false })),
				);
			});
		}
	};

	const onTodoEdit = (id) => {
		dispatch(UPDATE_TODO(setTodoInTodos(todos, { id, isEditing: true })));
	};

	const onTodoTitleChange = (id, newTitle) => {
		dispatch(UPDATE_TODO(setTodoInTodos(todos, { id, title: newTitle })));
	};

	const onTodoCompletedChange = (id, newCompleted) => {
		updateTodo({ id, completed: newCompleted }).then(() => {
			dispatch(UPDATE_TODO(setTodoInTodos(todos, { id, completed: newCompleted })));
		});
	};

	const onTodoRemove = (id) => {
		deleteTodo(id).then(() => dispatch(UPDATE_TODO(removeTodo(todos, id))));
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
