/**
 * Hero model.
 */
import {ModelBase} from '../contracts/modelBase';

export class Hero extends ModelBase<number> {
	// region protected fields
	/**
	 * Model reference name.
	 * @type {string}
	 */
	protected static _table: string = 'heroes';
	// endregion

	/**
	 * Creates a new Hero instance.
	 * @param {number} id The id of the hero.
	 * @param {string} name The name of the hero.
	 * @returns {Hero} A new Hero instance.
	 */
	public constructor(public id: number, public name: string) {
		super();
	}
}