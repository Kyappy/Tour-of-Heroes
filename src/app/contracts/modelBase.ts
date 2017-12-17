/**
 * Model base class.
 * @template T: Model key type.
 */
export abstract class ModelBase<T> {
	// region public getters.
	/**
	 * Model name.
	 * @returns {string} The name of the model.
	 */
	public static get reference(): string {
		return this._reference || this.name;
	}

	/**
	 * Model table name.
	 * @returns {string}
	 */
	public static get table(): string {
		return this._table || this.reference;
	}

	/**
	 * Model primary key.
	 * @returns {string} The name of the primary key.
	 */
	public static get key(): string {
		return this._key || 'id';
	}
	// endregion

	// region private fields
	/**
	 * Model reference.
	 * {string}
	 */
	protected static _reference: string;

	/**
	 * Model table.
	 * {string}
	 */
	protected static _table: string;

	/**
	 * Model primary key.
	 * {string}
	 */
	protected static _key: string;
	// endregion
}