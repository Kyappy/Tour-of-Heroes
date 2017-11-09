import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

/**
 * App hero search component.
 */
@Component({
	selector: 'app-hero-search',
	styleUrls: ['./hero-search.component.css'],
	templateUrl: './hero-search.component.html'
})
export class HeroSearchComponent implements OnInit {
	// region protected fields
	/**
	 * The heroes search results.
	 * @type {Observable<Hero[]>}
	 */
	protected heroes$: Observable<Hero[]>;
	// endregion

	// region private fields
	/**
	 * The string to search.
	 * @type {Subject<string>}
	 */
	private searchTerms: Subject<string> = new Subject<string>();
	// endregion

	// region private inputs
	/**
	 * The delay between to search requests.
	 * @type {Subject<string>}
	 */
	private searchDelay: number = 300;
	// endregion

	/**
	 * Creates a new HeroSearchComponent instance.
	 * @param {HeroService} heroService
	 */
	public constructor(private heroService: HeroService) {}

	// region angular methods
	/**
	 * Initialize the component.
	 */
	public ngOnInit(): void {
		this.heroes$ = this.searchTerms.pipe(
			debounceTime(this.searchDelay),
			distinctUntilChanged(),
			switchMap((term: string) => this.heroService.searchHeroes(term)),
		);
	}
	// endregion

	// region public methods
	/**
	 * Pushes a search term into the observable stream.
	 * @param {string} term
	 */
	public search(term: string): void {
		this.searchTerms.next(term);
	}
	// endregion
}