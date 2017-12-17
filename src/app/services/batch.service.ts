import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiServiceBase} from '../contracts/apiServiceBase';
import {ModelBase} from '../contracts/modelBase';
import {RoutesService} from './routes.service';

// region local constants
/**
 * Get all key.
 * @type {string}
 */
const GET_ALL: string = 'getAll';
// endregion

/**
 * CRUD service.
 * @template T: The data type.
 * @template K: The data key type.
 */
@Injectable()
export class BatchService<T extends ModelBase<K>, K> extends ApiServiceBase<T, K> {
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
	 */
	public initialize(model: any): void {
		super.initialize(model);
		this.routesService.add(this.buildKey(GET_ALL), this._route);
	}

	/**
	 * Gets all stored data.
	 * @param {callback} success Success callback.
	 * @param {callback} failure Failure callback.
	 * @returns {Observable} Observable data array.
	 */
	public getAll(success: (data: T[]) => void = null, failure: (err: any, caught: Observable<T[]>) => Observable<T[]> = null): Observable<T[]> {
		return BatchService.resolve(this.http.get<T[]>(this.routesService.get(this.buildKey(GET_ALL)), this._httpOptions), success, failure);
	}
	// endregion
}