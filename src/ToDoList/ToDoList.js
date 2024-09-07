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
			<h1 className={styles.title}> TO DO LIST </h1>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<ul className={styles.borderList}>
					{toDos.map(({ id, title }) => (
						<li key={id}>{title}</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default ToDoList;
