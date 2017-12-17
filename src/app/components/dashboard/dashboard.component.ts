import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';

/**
 * Dashboard component.
 */
@Component({
	selector: 'app-dashboard',
	styleUrls: ['./dashboard.component.css'],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
	// region public fields
	/**
	 * Gets the dashboard heroes.
	 * @returns {Hero[]}
	 */
	public get heroes(): Hero[] { return this._heroes; }
	// endregion

	// region private fields
	/**
	 * Heroes display count.
	 * @type {number}
	 */
	@Input('displayCount') private _displayCount: number = 5;

	/**
	 * Dashboard heroes.
	 * @type {Hero[]}
	 * @private
	 */
	private _heroes: Hero[] = [];
	// endregion

	/**
	 * Creates a new DashboardComponent instance.
	 * @param {HeroService} heroService The hero service to inject.
	 * @returns {DashboardComponent} A new DashboardComponent instance.
	 */
	public constructor(private heroService: HeroService) {}

	// region angular life cycle
	/**
	 * Initializes the component.
	 * @returns {void}
	 */
	public ngOnInit(): void {
		this.getHeroes();
	}
	// endregion

	// region public methods
	/**
	 * Gets the heroes to display.
	 * @returns {void}
	 */
	public getHeroes(): void {
		this.heroService.getAll().subscribe((heroes: Hero[]) => this._heroes = heroes.slice(1, this._displayCount));
	}
	// endregion
}