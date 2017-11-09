import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

/**
 * Dashboard component.
 */
@Component({
	selector: 'app-dashboard',
	styleUrls: ['./dashboard.component.css'],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
	// region protected fields
	/**
	 * Dashboard heroes.
	 * @type {Hero[]}
	 */
	protected heroes: Hero[] = [];
	// endregion

	// region private inputs
	/**
	 * Heroes display count.
	 * @type {number}
	 */
	@Input() private displayCount: number = 5;
	// endregion

	/**
	 * Creates a new DashboardComponent instance.
	 * @param {HeroService} heroService
	 */
	public constructor(private heroService: HeroService) {}

	// region angular methods
	/**
	 * Initializes the component.
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
		this.heroService.getHeroes().subscribe((heroes: Hero[]) => this.heroes = heroes.slice(1, this.displayCount));
	}
	// endregion
}