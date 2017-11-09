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
	// region protected inputs
	/**
	 * The hero to display.
	 */
	@Input() protected hero: Hero;
	// endregion

	/**
	 * Creates a new HeroDetailComponent instance.
	 * @param {ActivatedRoute} route
	 * @param {HeroService} heroService
	 * @param {Location} location
	 */
	public constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}

	// region angular methods
	/**
	 * Initialize the component.
	 */
	public ngOnInit(): void {
		this.getHero();
	}
	// endregion

	// region public methods
	/**
	 * Gets the hero to display.
	 */
	public getHero(): void {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.heroService.getHero(id).subscribe((hero: Hero) => this.hero = hero);
	}

	/**
	 * Goes to the previous location.
	 */
	public goBack(): void {
		this.location.back();
	}

	/**
	 * Saves the hero.
	 */
	public save(): void {
		this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
	}
	// endregion
}