import styles from './todo.module.css';
import { Button } from '../button/button';

export const Todo = ({
	title,
	completed,
	isEditing,
	onTitleChange,
	onCompletedChange,
	onSave,
	onCancel,
}) => {
	const shortTitle = `${title.slice(0, 10)}...`;
	return (
		<div className={styles.todo}>
			<input
				className={styles.checkbox}
				type="checkbox"
				checked={completed}
				onChange={({ target }) => onCompletedChange(target.checked)}
			/>
			<div className={styles.todoTitle}>
				{isEditing ? (
					<div>
						<input
							type="text"
							value={title}
							onChange={({ target }) => onTitleChange(target.value)}
						/>
						{title !== '' ? (
							<Button onClick={onSave}>✔️</Button>
						) : (
							<Button onClick={onCancel}>❌</Button>
						)}
					</div>
				) : (
					<div className={styles.title}>
						{title.length > 10 ? shortTitle : title}{' '}
					</div>
				)}
			</div>
		</div>
	);
};
