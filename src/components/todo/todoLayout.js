import styles from './todo.module.css';
import { Button } from '../button/button';

export const ToDoLayout = ({
	id,
	title,
	completed,
	isEditing,
	onTodoCompletedChange,
	onTodoTitleChange,
	onTodoEdit,
	onTodoSave,
	onTodoRemove,
}) => {
	return (
		<div className={styles.todo}>
			<input
				className={styles.checkbox}
				type="checkbox"
				checked={completed}
				onChange={({ target }) => onTodoCompletedChange(id, target.checked)}
			/>
			<div className={styles.todoTitle}>
				{isEditing ? (
					<input
						type="text"
						value={title}
						onChange={({ target }) => onTodoTitleChange(id, target.value)}
					/>
				) : (
					<div onClick={({ target }) => onTodoEdit(id)}> {title} </div>
				)}
			</div>

			<div>
				{isEditing ? (
					<Button onClick={({ target }) => onTodoSave(id)}>➲</Button>
				) : (
					<Button onClick={({ target }) => onTodoRemove(id)}>❌</Button>
				)}
			</div>
		</div>
	);
};
