const initialSearchPhraseState = '';

export const searchPhraseReducer = (state = initialSearchPhraseState, action) => {
	switch (action.type) {
		case 'SET_SEARCH_PHRASE': {
			state = action.payload;
			return state;
		}
		default:
			return state;
	}
};
