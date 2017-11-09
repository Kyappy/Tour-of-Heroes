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
	 * Creates a new MessagesComponent instance.
	 * @param {MessageService} messageService
	 */
	public constructor(public messageService: MessageService) {}
}