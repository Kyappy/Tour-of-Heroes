import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {Hero} from './hero';
import {MessageService} from './message.service';

/**
 * Http request options configuration.
 * @type {{headers: HttpHeaders}}
 */
const httpOptions: {headers: HttpHeaders} = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

/**
 * Hero service.
 */
@Injectable()
export class HeroService {
	// region private fields
	/**
	 * URL to web api.
	 * @type {string}
	 */
	private heroesUrl: string = 'api/heroes';

	/**
	 * Log message prefix.
	 * @type {string}
	 */
	private logPrefix: string = 'HeroService: ';
	// endregion

	/**
	 * Creates a new Hero service instance.
	 * @param {HttpClient} http
	 * @param {MessageService} messageService
	 */
	public constructor(private http: HttpClient, private messageService: MessageService) {}

	// region public methods
	/**
	 * Gets heroes from the server.
	 * @returns {Observable<Hero[]>}
	 */
	public getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(tap((heroes: Hero[]) => this.log(`fetched heroes`)), catchError(this.handleError('getHeroes', [])));
	}

	/**
	 * Gets hero by id. Return `undefined` when id not found
	 * @param {number} id - The id of the hero to get.
	 * @returns {Observable<Hero>}
	 */
	public getHeroNo404<Data>(id: number): Observable<Hero> {
		return this.http.get<Hero[]>(`${this.heroesUrl}/?id=${id}`)
			.pipe(
				map((heroes: Hero[]) => heroes[0]),
				tap((h: Hero) => this.log(`${h ? `fetched` : `did not find`} hero id=${id}`)),
				catchError(this.handleError<Hero>(`getHero id=${id}`)));
	}

	/**
	 * Gets the hero by id. Will 404 if id not found.
	 * @param {number} id - The id of the hero to get.
	 * @returns {Observable<Hero>}
	 */
	public getHero(id: number): Observable<Hero> {
		return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
			tap(() => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}

	/**
	 * Gets heroes whose name contains search term.
	 * @param {string} term - The search term.
	 * @returns {Observable<Hero[]>}
	 */
	public searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) return of([]);

		return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
			tap(() => this.log(`found heroes matching "${term}"`)),
			catchError(this.handleError<Hero[]>('searchHeroes', []))
		);
	}

	/**
	 * Adds a new hero to the server.
	 * @param {Hero} hero - The hero to add.
	 * @returns {Observable<Hero>}
	 */
	public addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
			tap((heroToAdd: Hero) => this.log(`added hero w/ id=${heroToAdd.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		);
	}

	/**
	 * Deletes the hero from the server.
	 * @param {Hero | number} hero - The hero to delete.
	 * @returns {Observable<Hero>}
	 */
	public deleteHero(hero: Hero | number): Observable<Hero> {
		const id: number = typeof hero === 'number' ? hero : hero.id;

		return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, httpOptions).pipe(
			tap(() => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>('deleteHero'))
		);
	}

	/**
	 * Updates the hero on the server.
	 * @param {Hero} hero - The hero to update.
	 * @returns {Observable<any>}
	 */
	public updateHero(hero: Hero): Observable<any> {
		return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
			tap(() => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
	}
	// endregion

	// region private methods
	/**
	 * Handle Http operation that failed. Let the app continue.
	 * @param {string} operation - name of the operation that failed
	 * @param {T} result - optional value to return as the observable result
	 * @returns {(error: any) => Observable<T>}
	 */
	private handleError<T>(operation: string = 'operation', result?: T): (errpr: any) => Observable<T> {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			// console.error(error); // Log to console instead
			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
	}

	/**
	 * Logs a HeroService message with the MessageService
	 * @param {string} message - The message to log.
	 */
	private log(message: string): void {
		this.messageService.add(this.logPrefix + message);
	}
	// endregion
}