import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { isAlphabetSortingReducer, searchPhraseReducer, todosReducer } from './reducers';

const reducer = combineReducers({
	todos: todosReducer,
	searchPhrase: searchPhraseReducer,
	isAlphabetSorting: isAlphabetSortingReducer,
});

//для редакс девтулс взято с гитхаба редакс девтулс (расширение)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
