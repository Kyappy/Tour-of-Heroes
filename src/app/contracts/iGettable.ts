import {Observable} from 'rxjs/Observable';

/**
 * Gettable interface.
 * @template T: gettable data type.
 * @template K: gettable key type.
 */
export interface IGettable<T, K> {
	/**
	 * Gets the data matching the given key.
	 * @param {K} key: The key of the data to get.
	 * @returns {Observable<Hero>}: An observable for the data matching the key.
	 */
	get(key: K): Observable<T>;
}