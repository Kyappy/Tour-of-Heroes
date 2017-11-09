import {Injectable} from '@angular/core';

/**
 * Message service.
 */
@Injectable()
export class MessageService {
	// region public properties
	/**
	 * The message stack.
	 * @type {Array}
	 */
	public messages: string[] = [];
	// endregion

	// region public methods
	/**
	 * Adds a message to the messages stack.
	 * @param {string} message - The message to display.
	 */
	public add(message: string): void {
		this.messages.push(message);
	}

	/**
	 * Clears the messages.
	 */
	public clear(): void {
		this.messages.length = 0;
	}
	// endregion
}