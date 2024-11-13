export const setTodos = (updatedData) => {
	return {
		type: 'SET_TODOS',
		payload: updatedData,
	};
};
