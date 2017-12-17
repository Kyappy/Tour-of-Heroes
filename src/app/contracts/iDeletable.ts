import {Observable} from 'rxjs/Observable';

/**
 * Deletable interface.
 * @template T: deletable data type.
 * @template K: deletable key type.
 */
export interface IDeletable<T, K> {
	/**
	 * Deletes the given data or the data matching the given key.
	 * @param {T | K} target: Data or key of the data to delete.
	 * @returns {Observable<T>}: An observable for the deleted data.
	 */
	delete(target: T | K): Observable<T>;
}