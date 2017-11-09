import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

/**
 * App heroes component.
 */
@Component({
	selector: 'app-heroes',
	styleUrls: ['./heroes.component.css'],
	templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
	// region public accessors
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
	 * @param {HeroService} heroService
	 */
	public constructor(private heroService: HeroService) {}

	// region angular methods
	/**
	 * Initialize the component.
	 */
	public ngOnInit(): void {
		this.getHeroes();
	}
	// endregion

	// region public methods
	/**
	 * Gets the heroes to display.
	 */
	public getHeroes(): void {
		this.heroService.getHeroes().subscribe((heroes: Hero[]) => this._heroes = heroes);
	}

	/**
	 * Adds a new hero.
	 * @param {string} name - The name of the hero to add.
	 */
	public add(name: string): void {
		name = name.trim();
		if (!name) { return; }
		this.heroService.addHero(new Hero(undefined, name)).subscribe((hero: Hero) => this._heroes.push(hero));
	}

	/**
	 * Deletes the given hero.
	 * @param {Hero} hero - The hero to delete.
	 */
	public remove(hero: Hero): void {
		this._heroes = this._heroes.filter((h: Hero) => h !== hero);
		this.heroService.deleteHero(hero).subscribe();
	}
	// endregion
}