import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {HeroService} from '../../services/hero.service';
import {Hero} from '../../models/hero';

/**
 * App hero search component.
 */
@Component({
	selector: 'app-hero-search',
	styleUrls: ['./hero-search.component.css'],
	templateUrl: './hero-search.component.html'
})
export class HeroSearchComponent implements OnInit {
	// region public getters
	/**
	 * Gets the heroes search results.
	 * @returns {Observable<Hero[]>}
	 */
	public get heroes$(): Observable<Hero[]> { return this._heroes$; }
	// endregion

	// region private fields
	/**
	 * The heroes search results.
	 * @type {Observable<Hero[]>}
	 */
	private _heroes$: Observable<Hero[]>;

	/**
	 * The string to search.
	 * @type {Subject<string>}
	 */
	private _searchTerms: Subject<string> = new Subject<string>();

	/**
	 * The delay between to search requests.
	 * @type {Subject<string>}
	 */
	@Input('searchDelay') private _searchDelay: number = 300;
	// endregion

	/**
	 * Creates a new HeroSearchComponent instance.
	 * @param {HeroService} heroService: The hero service to inject.
	 * @returns {HeroSearchComponent} A new HeroSearchComponent instance.
	 */
	public constructor(private heroService: HeroService) {}

	// region angular life cycle
	/**
	 * Initialize the component.
	 * @returns {void}
	 */
	public ngOnInit(): void {
		this._heroes$ = this._searchTerms.pipe(
			debounceTime(this._searchDelay),
			distinctUntilChanged(),
			switchMap((term: string) => this.heroService.search(term)),
		);
	}
	// endregion

	// region public methods
	/**
	 * Pushes a search term into the observable stream.
	 * @param {string} term: The term to search
	 * @returns {void}
	 */
	public search(term: string): void {
		this._searchTerms.next(term);
	}
	// endregion
}