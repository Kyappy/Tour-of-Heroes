import {Observable} from 'rxjs/Observable';

/**
 * CRUD interface.
 * @template T: CRUD data type.
 * @template K: CRUD key type.
 */
export interface ICrudable<T, K> {
	/**
	 * Gets the data matching the given key.
	 * @param {K} key: The key of the data to get.
	 * @returns {Observable<Hero>}: An observable for the data matching the key.
	 */
	get(key: K): Observable<T>;

	/**
	 * Creates the given data.
	 * @param {T} data: The data to create.
	 * @returns {Observable<T>}: An observable for the created data.
	 */
	post(data: T): Observable<T>;

	/**
	 * Edits the given data.
	 * @param {T} data: The data to edit.
	 * @returns {Observable<T>}: An observable for the edited data.
	 */
	put(data: T): Observable<T>;

	/**
	 * Deletes the given data or the data matching the given key.
	 * @param {T | K} target: Data or key of the data to delete.
	 * @returns {Observable<T>}: An observable for the deleted data.
	 */
	delete(target: T | K): Observable<T>;
}