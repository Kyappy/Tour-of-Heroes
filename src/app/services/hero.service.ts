import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {IBatchGettable} from '../contracts/iBatchGettable';
import {ICrudable} from '../contracts/iCrudable';
import {ISearchable} from '../contracts/iSearchable';
import {Hero} from '../models/hero';
import {BatchService} from './batch.service';
import {CRUDService} from './crud.service';
import {MessageService} from './message.service';
import {SearchService} from './search.service';

/**
 * Hero service.
 */
@Injectable()
export class HeroService implements ICrudable<Hero, number>, IBatchGettable<Hero>, ISearchable<Hero, string> {
	/**
	 * Creates a new Hero service instance.
	 * @param {MessageService} messageService The message service to inject.
	 * @param {CRUDService<Hero, number>} crudService: The crud service to inject.
	 * @param {SearchService<Hero, number>} searchService: The search service to inject.
	 * @param {SearchService<Hero, number>} batchService: The batch service to inject.
	 * @returns {HeroService} A new HeroService instance.
	 */
	public constructor(
		private messageService: MessageService,
		private crudService: CRUDService<Hero, number>,
		private searchService: SearchService<Hero, string>,
		private batchService: BatchService<Hero, string>) {
		crudService.initialize(Hero);
		searchService.initialize(Hero);
		batchService.initialize(Hero);
	}

	// region public methods
	/**
	 * Gets heroes from the server.
	 * @returns {Observable<Hero[]>} The heroes found.
	 */
	public getAll(): Observable<Hero[]> {
		return this.batchService.getAll(() => this.messageService.add(`fetched heroes`), this.handleError('getHeroes', []));
	}

	/**
	 * Gets the hero by id, will 404 if id not found.
	 * @param {number} key The id of the hero to get.
	 * @returns {Observable<Hero>} The hero found.
	 */
	public get(key: number): Observable<Hero> {
		return this.crudService.get(key, () => this.messageService.add(`fetched hero id=${key}`), this.handleError<Hero>(`getHero id=${key}`));
	}

	/**
	 * Gets heroes whose name contains search term.
	 * @param {string} term The search term.
	 * @returns {Observable<Hero[]>} The heroes matching the search term.
	 */
	public search(term: string): Observable<Hero[]> {
		return this.searchService.search(term, () => this.messageService.add(`found heroes matching "${term}"`), this.handleError<Hero[]>('searchHeroes', []));
	}

	/**
	 * Adds a new hero to the server.
	 * @param {Hero} hero The hero to add.
	 * @returns {Observable<Hero>} The updated heroes observable.
	 */
	public post(hero: Hero): Observable<Hero> {
		return this.crudService.post(hero, () => this.messageService.add(`added hero w/ id=${hero.id}`), this.handleError<Hero>('addHero'));
	}

	/**
	 * Deletes the hero from the server.
	 * @param {Hero | number} target The hero to delete.
	 * @returns {Observable<Hero>} The update heroes observable.
	 */
	public delete(target: Hero | number): Observable<Hero> {
		return this.crudService.delete(target, () => this.messageService.add(`deleted hero id=${target['id']}`), this.handleError<Hero>('deleteHero'));
	}

	/**
	 * Updates the hero on the server.
	 * @param {Hero} hero The hero to update.
	 * @returns {Observable<any>} The updated hero observable.
	 */
	public put(hero: Hero): Observable<any> {
		return this.crudService.put(hero, () => this.messageService.add(`updated hero id=${hero.id}`), this.handleError<Hero>('updateHero'));
	}
	// endregion

	// region private methods
	/**
	 * Handle Http operation that failed, let the app continue.
	 * @param {string} operation name of the operation that failed.
	 * @param {T} result optional value to return as the observable result.
	 * @returns {callback} The errors found.
	 */
	private handleError<T>(operation: string = 'operation', result?: T): (error: any) => Observable<T> {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			// console.error(error); // Log to console instead
			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	/**
	 * Logs a HeroService message with the MessageService.
	 * @param {string} message The message to log.
	 * @returns {void}
	 */
	private log(message: string): void {
		this.messageService.add(message);
	}
	// endregion
}