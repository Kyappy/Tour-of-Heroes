import {Location} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

/**
 * Hero detail component.
 */
@Component({
	selector: 'app-hero-detail',
	styleUrls: ['./hero-detail.component.css'],
	templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
	/**
	 * The hero to display.
	 */
	@Input() protected hero: Hero;

	/**
	 * Creates a new HeroDetailComponent instance.
	 * @param {ActivatedRoute} route The activated route to inject.
	 * @param {HeroService} heroService The hero service to inject.
	 * @param {Location} location The location to inject.
	 * @returns {HeroDetailComponent} A new HeroDetailComponent instance.
	 */
	public constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}

	/**
	 * Initialize the component.
	 * @returns {void}
	 */
	public ngOnInit(): void {
		this.getHero();
	}

	/**
	 * Gets the hero to display.
	 * @returns {void}
	 */
	public getHero(): void {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.heroService.getHero(id).subscribe((hero: Hero) => this.hero = hero);
	}

	/**
	 * Goes to the previous location.
	 * @returns {void}
	 */
	public goBack(): void {
		this.location.back();
	}

	/**
	 * Saves the hero.
	 * @returns {void}
	 */
	public save(): void {
		this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
	}
}