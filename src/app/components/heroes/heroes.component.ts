import {Component, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Hero} from '../../models/hero';

/**
 * App heroes component.
 */
@Component({
	selector: 'app-heroes',
	styleUrls: ['./heroes.component.css'],
	templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
	// region public getters
	/**
	 * Gets the heroes to display.
	 * @returns {Hero[]}
	 */
	public get heroes(): Hero[] { return this._heroes; }
	// endregion

	// region private fields
	/**
	 * The heroes to display.
	 * @type {Hero[]}
	 */
	private _heroes: Hero[];
	// endregion

	/**
	 * Creates a new HeroesComponent instance.
	 * @param {HeroService} heroService: The hero service to inject.
	 * @returns {HeroesComponent} A new HeroesComponent instance.
	 */
	public constructor(private heroService: HeroService) {}

	// region angular life cycle
	/**
	 * Initialize the component.
	 * @returns {void}
	 */
	public ngOnInit(): void {
		this.getHeroes();
	}
	// endregion

	/**
	 * Gets the heroes to display.
	 * @returns {void}
	 */
	public getHeroes(): void {
		this.heroService.getAll().subscribe((heroes: Hero[]) => this._heroes = heroes);
	}

	// region public methods
	/**
	 * Adds a new hero.
	 * @param {string} name: The name of the hero to add.
	 * @returns {void}
	 */
	public add(name: string): void {
		name = name.trim();
		if (!name) { return; }
		this.heroService.post(new Hero(undefined, name)).subscribe((hero: Hero) => this._heroes.push(hero));
	}

	/**
	 * Deletes the given hero.
	 * @param {Hero} hero: The hero to delete.
	 * @returns {void}
	 */
	public remove(hero: Hero): void {
		this._heroes = this._heroes.filter((h: Hero) => h !== hero);
		this.heroService.delete(hero).subscribe();
	}
	// endregion
}