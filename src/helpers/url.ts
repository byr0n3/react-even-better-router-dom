import type { URLPatternResult } from '../types/url';
import { queryStringify } from './query.js';

const SLASH = '/';

const PATHNAME_PATTERN = /\/:([a-z]+)(?:\((.*?)\))?(\?)?/g;
const TEMPLATE_PATTERN = /\/{([a-z]+)}/g;

function pathnameReplacer(_: string, $1: string, $2: string = '[^/]+', $3: string = ''): string {
	return `(?:/(?<${ $1 }>${ $2 }))${ $3 }`;
}

function pathnameToRegExp(pathname: string): RegExp {
	return new RegExp('^' + pathname.replace(PATHNAME_PATTERN, pathnameReplacer) + '$', 'i');
}

class URLPattern {
	public readonly template: string;
	public readonly pathname: string;

	public readonly exec = this.#exec.bind(this);

	readonly #pathname: RegExp;

	public constructor(pathname: string) {
		pathname = sanitizePath(pathname);

		this.#pathname = pathnameToRegExp(pathname);

		this.template = pathname.replace(PATHNAME_PATTERN, SLASH + '{$1}');
		this.pathname = pathname;
	}

	#exec(input: string): URLPatternResult | null {
		const pathname = this.#pathname.exec(decodeURI(input));

		if (!pathname) {
			return null;
		}

		return Object.freeze({
			inputs: [input],
			pathname,
		});
	}
}

function generatePath(pattern: string | URLPattern, params?: Record<string, string | number | undefined>): string {
	const template = (pattern instanceof URLPattern ? pattern : new URLPattern(pattern)).template;

	const keys: string[] = [];

	const result = template.replace(TEMPLATE_PATTERN, function (_, $1) {
		keys.push($1);

		const value = params?.[$1];

		if (!value) {
			return '';
		}

		return SLASH + value;
	});

	if (!params) {
		return result;
	}

	return result + queryStringify(params, keys);
}

function sanitizePath(value: string) {
	value = decodeURI(value);
	if (value.slice(0, SLASH.length) !== SLASH) {
		return SLASH + value;
	}

	return value;
}

export { URLPattern, generatePath, sanitizePath };
