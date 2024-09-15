import React, { useEffect, useState } from 'react';
import styles from './TodoList.module.css';

function ToDoList() {
	const [toDos, setToDos] = useState([]);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [newToDo, setNewToDo] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

	const myData = toDos.slice();

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3000/posts')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDos(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodos]);

	const onChange = (event) => {
		const { value } = event.target;
		setNewToDo(value);
		if (value.length > 1) {
			setIsValid(true);
		}
	};

	const requestAddToDo = () => {
		setIsLoading(true);

		fetch('http://localhost:3000/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newToDo,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('новая задача добавлена:', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => {
				setIsLoading(false);
				setNewToDo('');
				setIsValid(false);
			});
	};

	const deleteToDo = (id) => {
		setIsLoading(true);

		fetch(`http://localhost:3000/posts/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Задача удалена, ответ сервера: ', response);
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => setIsLoading(false));
	};

	const alphabeticallySortedToDo = () => {
		setIsSorted(!isSorted);
	};

	return (
		<div>
			<h1 className={styles.title}> TO DO LIST </h1>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.content}>
					<input
						type="text"
						value={newToDo}
						placeholder="Create new to do"
						onChange={onChange}
					/>
					<button
						type="button"
						className={
							isValid ? styles.createButton : styles.disabledCreateButton
						}
						onClick={requestAddToDo}
						disabled={!isValid}
					>
						create
					</button>

					<button type="button" onClick={alphabeticallySortedToDo}>
						{isSorted
							? 'Отсортировать по времени добавления'
							: 'Отсортировать по алфавиту'}
					</button>

					<ul className={styles.borderList}>
						{isSorted
							? myData
									.sort(function (a, b) {
										if (a.title.toLowerCase() < b.title.toLowerCase())
											return -1;
										if (a.title.toLowerCase() > b.title.toLowerCase())
											return 1;
										return 0;
									})
									.map(({ id, title }) => (
										<div>
											<li key={id} id={id}>
												{title}
											</li>{' '}
											<button
												className={styles.deleteButton}
												onClick={() => deleteToDo(id)}
											>
												Удалить
											</button>
										</div>
									))
							: toDos.map(({ id, title }) => (
									<div>
										<li key={id} id={id}>
											{title}
										</li>{' '}
										<button
											className={styles.deleteButton}
											onClick={() => deleteToDo(id)}
										>
											Удалить
										</button>
									</div>
								))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default ToDoList;
