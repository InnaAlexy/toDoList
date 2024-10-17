import styles from './task.module.css';
import { Button } from '../button/button';

export const Task = ({
	title,
	isEditing,
	onTitleChange,
	onEdit,
	onSave,
	onRemove,
	navigate,
}) => {
	return (
		<div className={styles.task}>
			<Button onClick={navigate}> «Back </Button>
			{isEditing ? (
				<input
					type="text"
					value={title}
					onChange={({ target }) => onTitleChange(target.value)}
				/>
			) : (
				<div> {title} </div>
			)}

			<div>
				<Button onClick={onSave}>Save➲</Button>
				<Button onClick={onEdit}>Edit🖊️</Button>
				<Button onClick={onRemove}>Delete❌</Button>
			</div>
		</div>
	);
};
