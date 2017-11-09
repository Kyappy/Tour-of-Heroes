import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Hero} from '../../supports/hero';

/**
 * Dashboard component.
 */
@Component({
	selector: 'app-dashboard',
	styleUrls: ['./dashboard.component.css'],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
	/**
	 * Gets the dashboard heroes.
	 * @returns {Hero[]}
	 */
	public get heroes(): Hero[] { return this._heroes; }

	/**
	 * Heroes display count.
	 * @type {number}
	 * @private
	 */
	@Input('displayCount') private _displayCount: number = 5;

	/**
	 * Dashboard heroes.
	 * @type {Hero[]}
	 * @private
	 */
	private _heroes: Hero[] = [];

	/**
	 * Creates a new DashboardComponent instance.
	 * @param {HeroService} heroService The hero service to inject.
	 * @returns {DashboardComponent} A new DashboardComponent instance.
	 */
	public constructor(private heroService: HeroService) {}

	/**
	 * Initializes the component.
	 * @returns {void}
	 */
	public ngOnInit(): void {
		this.getHeroes();
	}

	/**
	 * Gets the heroes to display.
	 * @returns {void}
	 */
	public getHeroes(): void {
		this.heroService.getHeroes().subscribe((heroes: Hero[]) => this._heroes = heroes.slice(1, this._displayCount));
	}
}