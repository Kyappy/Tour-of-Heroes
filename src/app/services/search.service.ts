import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ApiServiceBase} from '../contracts/apiServiceBase';
import {ModelBase} from '../contracts/modelBase';
import {RoutesService} from './routes.service';

// region local constants
/**
 * Search key.
 * @type {string}
 */
const SEARCH: string = 'search';

/**
 * Search term attribute.
 * @type {string}
 */
const SEARCH_TERM_ATTRIBUTE: string = '/?name=:term';
// endregion

/**
 * CRUD service.
 * @template T: The data type.
 * @template K: The data key type.
 */
@Injectable()
export class SearchService<T extends ModelBase<K>, K> extends ApiServiceBase<T, K> {
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
		this.routesService.add(this.buildKey(SEARCH), this._route + SEARCH_TERM_ATTRIBUTE);
	}

	/**
	 * Searches data matching term string.
	 * @param {string} term The search string.
	 * @param {callback} success Success callback.
	 * @param {callback} failure Failure callback.
	 * @returns {Observable} Observable data array.
	 */
	public search(term: string, success: (data: T[]) => void = null, failure: (err: any, caught: Observable<T[]>) => Observable<T[]> = null): Observable<T[]> {
		if (!term.trim()) return of([]);
		return SearchService.resolve(this.http.get<T[]>(this.routesService.get(this.buildKey(SEARCH), {term}), this._httpOptions), success, failure);
	}
	// endregion
}