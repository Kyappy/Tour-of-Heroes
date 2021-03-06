import {Component} from '@angular/core';

/**
 * App component.
 */
@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.css'],
	templateUrl: './app.component.html'
})
export class AppComponent {
	/**
	 * The application title.
	 * @type {string}
	 */
	public title: string = 'Tour of Heroes';
}