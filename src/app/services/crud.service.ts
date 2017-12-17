import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiServiceBase, ROUTE_PARAMETER} from '../contracts/apiServiceBase';
import {ModelBase} from '../contracts/modelBase';
import {RoutesService} from './routes.service';

// region local constants
/**
 * Get key.
 * @type {string}
 */
const GET: string = 'get';

/**
 * Post key.
 * @type {string}
 */
const POST: string = 'post';

/**
 * Delete key.
 * @type {string}
 */
const DELETE: string = 'delete';

/**
 * Put key.
 * @type {string}
 */
const PUT: string = 'put';
// endregion

/**
 * CRUD service.
 * @template T: The data type.
 * @template K: The data key type.
 */
@Injectable()
export class CRUDService<T extends ModelBase<K>, K> extends ApiServiceBase<T, K> {
	/**
	 * Creates a new CRUDService instance.
	 * @param {HttpClient} http: The http client to inject.
	 * @param {RoutesService} routesService: The routes service to inject.
	 * @returns {BackendService} A new BackendService instance.
	 */
	public constructor(http: HttpClient, routesService: RoutesService) {
		super(http, routesService);
	}

	// region public methods
	/**
	 * Initialize crud data.
	 * @param {ModelBase<K>} model: The CRUD model.
	 * @returns {void}
	 */
	public initialize(model: any): void {
		super.initialize(model);
		this.routesService.add(this.buildKey(GET), this._route + ROUTE_PARAMETER + this._model.key);
		this.routesService.add(this.buildKey(POST), this._route);
		this.routesService.add(this.buildKey(DELETE), this._route + ROUTE_PARAMETER + this._model.key);
		this.routesService.add(this.buildKey(PUT), this._route);
	}

	/**
	 * Gets specified stored data.
	 * @param {K} key: The data key.
	 * @param {callback} success: Success callback.
	 * @param {callback} failure: Failure callback.
	 * @returns {Observable} Observable data.
	 */
	public get(key: K, success: (data: T) => void = null, failure: (err: any, caught: Observable<T>) => Observable<T> = null): Observable<T> {
		const data: {} = {};
		data[this._model.key] = key;
		return CRUDService.resolve(this.http.get<T>(this.routesService.get(this.buildKey(GET), data)), success, failure);
	}

	/**
	 * Posts the data.
	 * @param {T} data: The data to post.
	 * @param {callback} success: Success callback.
	 * @param {callback} failure: Failure callback.
	 * @returns {Observable} Observable data array.
	 */
	public post(data: T, success: (data: T) => void = null, failure: (err: any, caught: Observable<T>) => Observable<T> = null): Observable<T> {
		return CRUDService.resolve(this.http.post<T>(this.routesService.get(this.buildKey(POST), data), data, this._httpOptions), success, failure);
	}

	/**
	 * Puts the specified data.
	 * @param {T} data: The data to put.
	 * @param {callback} success: Success callback.
	 * @param {callback} failure: Failure callback.
	 * @returns {Observable<any>} Observable data object.
	 */
	public put(data: T, success: (data: T) => void = null, failure: (err: any, caught: Observable<T>) => Observable<T> = null): Observable<any> {
		return CRUDService.resolve(this.http.put(this.routesService.get(this.buildKey(PUT), data), data, this._httpOptions), success, failure);
	}

	/**
	 * Deletes the specified data.
	 * @param {K | T} data :The data to delete.
	 * @param {callback} success: Success callback.
	 * @param {callback} failure: Failure callback.
	 * @returns {Observable} Observable data array.
	 */
	public delete(data: T | K, success: (data: T) => void = null, failure: (err: any, caught: Observable<T>) => Observable<T> = null): Observable<T> {
		return CRUDService.resolve(this.http.delete<T>(this.routesService.get(this.buildKey(DELETE), data), this._httpOptions), success, failure);
	}
	// endregion
}