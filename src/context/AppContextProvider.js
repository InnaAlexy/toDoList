import { SearchContext } from './searchContext.js';
import { SortingContext } from './sortingContext.js';

export const AppContextProvider = ({ serchValue, sortingValue, children }) => {
	return (
		<SearchContext.Provider value={serchValue}>
			<SortingContext.Provider value={sortingValue}>
				{children}
			</SortingContext.Provider>
		</SearchContext.Provider>
	);
};
