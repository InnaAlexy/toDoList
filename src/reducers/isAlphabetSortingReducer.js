const initialSortingState = false;

export const isAlphabetSortingReducer = (state = initialSortingState, action) => {
	switch (action.type) {
		case 'SET_IS_ALPHABET_SORTING': {
			state = action.payload;
			return state;
		}
		default:
			return state;
	}
};
