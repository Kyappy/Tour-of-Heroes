import {Observable} from 'rxjs/Observable';

/**
 * Searchable interface.
 * @template T: gettable data type.
 * @template S: search term type.
 */
export interface ISearchable<T, S> {
	/**
	 * Gets data filtering on the search term.
	 * @param {S} term: The search term.
	 * @returns {Observable<T[]>}: An observable for the search result.
	 */
	search(term: S): Observable<T[]>;
}