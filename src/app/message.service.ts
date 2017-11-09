import {Injectable} from '@angular/core';

/**
 * Message service.
 */
@Injectable()
export class MessageService {
	/**
	 * The message stack.
	 * @type {Array}
	 */
	public messages: string[] = [];

	/**
	 * Adds a message to the messages stack.
	 * @param {string} message The message to display.
	 * @returns {void}
	 */
	public add(message: string): void {
		this.messages.push(message);
	}

	/**
	 * Clears the messages.
	 * @returns {void}
	 */
	public clear(): void {
		this.messages.length = 0;
	}
}