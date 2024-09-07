import React, { useEffect, useState } from 'react';
import styles from './TodoList.module.css';

function ToDoList() {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(
			() =>
				fetch('https://jsonplaceholder.typicode.com/todos')
					.then((response) => response.json())
					.then((loardedToDo) => setToDos(loardedToDo))
					.finally(() => setIsLoading(false)),
			6000,
		);
	}, []);

	return (
		<div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<ul className={styles.border}>
					{toDos.map(({ id, title, body }) => (
						<div key={id} className={styles.borderLi}>
							{title}
							{/* - {body} */}
						</div>
					))}
				</ul>

				// 	toDos.map(({ id, title, body }) => (
				// 		<div key={id} className={styles.todo}>
				// 			{title} - {body}
				// 		</div>
				// 	))
			)}
		</div>
	);
}

export default ToDoList;
