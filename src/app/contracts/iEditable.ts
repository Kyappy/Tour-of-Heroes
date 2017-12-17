import {Observable} from 'rxjs/Observable';

/**
 * Editable interface.
 * @template T: editable data type.
 */
export interface IEditable<T> {
	/**
	 * Edits the given data.
	 * @param {T} data: The data to edit.
	 * @returns {Observable<T>}: An observable for the edited data.
	 */
	put(data: T): Observable<T>;
}