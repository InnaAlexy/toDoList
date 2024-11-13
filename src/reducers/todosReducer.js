const initialTodosState = [];

export const todosReducer = (state = initialTodosState, action) => {
	switch (action.type) {
		case 'GET_TODOS_FROM_SERVER': {
			return [...state, ...action.payload];
		}
		case 'UPDATE_TODO': {
			state = [...action.payload];
			return state;
		}

		default:
			return state;
	}
};
