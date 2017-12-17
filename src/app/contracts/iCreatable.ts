import {Observable} from 'rxjs/Observable';

/**
 * Creatable interface.
 * @template T: creatable data type.
 */
export interface ICreatable<T> {
	/**
	 * Creates the given data.
	 * @param {T} data: The data to create.
	 * @returns {Observable<T>}: An observable for the created data.
	 */
	post(data: T): Observable<T>;
}