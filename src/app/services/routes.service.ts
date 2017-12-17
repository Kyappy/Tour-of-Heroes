import {Injectable} from '@angular/core';

const OBJECT_SEPARATOR: string = '.';
const URI_SEPARATOR: string = '/';
const PARAMETER_SEPARATOR: string = '=';

/**
 * The route service that handle available routes indexed with a key.
 */
@Injectable()
export class RoutesService {
	// region private fields
	/**
	 * The registry storing all routes.
	 * @type {{}}
	 */
	private routes: {[is: string]: string} = {};
	// endregion

	// region public methods
	/**
	 * Adds the route at the given key index.
	 * @param {string} key The route key.
	 * @param {string} value The route value.
	 * @returns {void}
	 */
	public add(key: string, value: string): void {
		this.routes[key] = value;
	}

	/**
	 * Gets the route from the registry matching the given key.
	 * @param {string} key: The route key.
	 * @param {{}} args: The route arguments.
	 * @param {string} prefix: The route prefix.
	 * @returns {string} The resolved route matching the key.
	 */
	public get(key: string, args: {} = null, prefix: string = null): string {
		const url: string = this.routes[(prefix != null ? prefix + OBJECT_SEPARATOR : '') + key];
		if (url == null) return null;
		return url.replace(/(?:\/:|=:)([^\/]+)/g, (fullMatch: string, name: string) => {
			let separator: string;
			if (fullMatch[0] === URI_SEPARATOR) separator = URI_SEPARATOR;
			else if (fullMatch[0] === PARAMETER_SEPARATOR) separator = PARAMETER_SEPARATOR;
			const arg: string = args[name];
			return arg ? separator + arg : '';
		});
	}
	// endregion
}