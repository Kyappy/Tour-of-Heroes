import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {RoutesService} from '../services/routes.service';
import {ModelBase} from './modelBase';

// region local constants
/**
 * Property separator.
 * @type {string}
 */
const SEPARATOR: string = '.';

/**
 * Route parameter separator.
 * @type {string}
 */
export const ROUTE_PARAMETER: string = '/:';

/**
 * Api route prefix.
 * @type {string}
 */
const API_PREFIX: string = 'api/';
// endregion

/**
 * Api service base.
 * @template T: The data type.
 * @template K: The data key type.
 */
export abstract class ApiServiceBase<T extends ModelBase<K>, K> {
	// region protected fields
	/**
	 * Model type.
	 * {typeof ModelBase}
	 */
	protected _model: typeof ModelBase;

	/**
	 * CRUD api route base.
	 * @type {string}
	 */
	protected _route: string;

	/**
	 * Http options.
	 * @type {{headers: HttpHeaders}}
	 */
	protected _httpOptions: {headers: HttpHeaders} = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
	// endregion

	/**
	 * Creates a new CRUDService instance.
	 * @param {HttpClient} http: The http client to inject.
	 * @param {RoutesService} routesService: The routes service to inject.
	 * @returns {BackendService} A new BackendService instance.
	 */
	public constructor(protected http: HttpClient, protected routesService: RoutesService) {}

	// region public methods
	/**
	 * Initialize crud data.
	 * @param {ModelBase<K>} model: The CRUD model.
	 * @returns {void}
	 */
	public initialize(model: typeof ModelBase): void {
		this._model = model;
		this._route = API_PREFIX + model.table;
	}
	// endregion

	// region protected methods
	/**
	 * Resolves the request callbacks.
	 * @param {Observable<U>} request The request to resolve.
	 * @param {callback} success Success callback.
	 * @param {callback} failure Failure callback.
	 * @returns {Observable<U>} The resolved request.
	 */
	protected static resolve<U>(request: Observable<U>, success: (data: U) => void = null, failure: (err: any, caught: Observable<U>) => Observable<U> = null): Observable<U> {
		if (success != null && failure != null) return request.pipe(tap(success), catchError(failure));
		else if (success != null) return request.pipe(tap(success));
		else if (failure != null) return request.pipe(catchError(failure));
		return request;
	}

	/**
	 * Builds the route key.
	 * @param {string} method The route method
	 * @returns {string} The route key matching the route method.
	 */
	protected buildKey(method: string): string {
		return this._model.reference == null ? method : this._model.reference + SEPARATOR + method;
	}
	// endregion
}