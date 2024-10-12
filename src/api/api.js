import { get, orderByChild, push, query, ref, remove, set } from 'firebase/database';
import { db } from '../firebase';

export const createTodo = (newTodo) =>
	push(ref(db, 'todos'), newTodo).then(({ key }) => key);

export const readTodo = (searchPhrase = '', isAlphabetSorting = false) => {
	const todoDbRef = ref(db, 'todos');
	const ordingField = isAlphabetSorting ? 'title' : 'id';

	return get(query(todoDbRef, orderByChild(ordingField))).then((snapshot) => {
		let loadedTodos = [];

		snapshot.forEach((todoSnapshot) => {
			const id = todoSnapshot.key;
			const { title, complited } = todoSnapshot.val();
			loadedTodos.push({ id, title, complited });
		});

		if (isAlphabetSorting && searchPhrase !== '') {
			loadedTodos = loadedTodos.filter(
				({ title }) =>
					title.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0,
			);
		}

		return isAlphabetSorting ? loadedTodos : loadedTodos.reverse();
	});
};
// fetchServer('GET', { searchPhrase, isAlphabetSorting });

export const updateTodo = (todoData) => set(ref(db, `todos/${todoData.id}`), todoData);

export const deleteTodo = (todoId) => remove(ref(db, `todos/${todoId}`));
