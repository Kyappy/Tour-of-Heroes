import {Component} from '@angular/core';
import {MessageService} from '../message.service';

/**
 * Message component.
 */
@Component({
	selector: 'app-messages',
	styleUrls: ['./messages.component.css'],
	templateUrl: './messages.component.html'
})
export class MessagesComponent {
	/**
	 * Creates a new HeroesComponent instance.
	 * @param {MessageService} messageService The message service to inject
	 * @returns {MessagesComponent} New message component instance.
	 */
	public constructor(public messageService: MessageService) {}
}