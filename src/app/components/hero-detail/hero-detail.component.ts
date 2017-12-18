import {Location} from '@angular/common';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../../models/hero';
import {HeroService} from '../../services/hero.service';
import {Subscription} from 'rxjs/Subscription';

/**
 * Hero detail component.
 */
@Component({
	selector: 'app-hero-detail',
	styleUrls: ['./hero-detail.component.css'],
	templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit, OnDestroy {
	// region public fields
	/**
	 * The hero to display.
	 */
	@Input() public hero: Hero;
	// endregion

	// region private fields
	/**
	 * Subscription for get hero observable.
	 */
	private _getSubscription: Subscription;

	/**
	 * Subscription for put hero observable.
	 */
	private _putSubscription: Subscription;
	// endregion

	/**
	 * Creates a new HeroDetailComponent instance.
	 * @param {ActivatedRoute} route The activated route to inject.
	 * @param {HeroService} heroService The hero service to inject.
	 * @param {Location} location The location to inject.
	 * @returns {HeroDetailComponent} A new HeroDetailComponent instance.
	 */
	public constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}

	// region angular life cycle
	/**
	 * Initialize the component.
	 * @returns {void}
	 */
	public ngOnInit(): void {
		this.getHero();
	}

	/**
	 * Destroys the component.
	 * @returns {void}
	 */
	public ngOnDestroy(): void {
		this._getSubscription.unsubscribe();
		this._putSubscription.unsubscribe();
	}
	// endregion

	// region public methods
	/**
	 * Gets the hero to display.
	 * @returns {void}
	 */
	public getHero(): void {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this._getSubscription = this.heroService.get(id).subscribe((hero: Hero) => this.hero = hero);
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
		this._getSubscription = this.heroService.put(this.hero).subscribe(() => this.goBack());
	}
	// endregion
}