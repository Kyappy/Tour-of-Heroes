import {Observable} from 'rxjs/Observable';

/**
 * Batch gettable interface.
 * @template T: gettable data type.
 */
export interface IBatchGettable<T> {
	/**
	 * Gets all the data.
	 * @returns {Observable<T[]>}: An observable for all the data returned.
	 */
	getAll(): Observable<T[]>;
}