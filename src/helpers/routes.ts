import type { RouteComponent, RouteDefinition } from '../types/routes';
import { generatePath, URLPattern } from './url';
import type { URLPatternResult } from '../types/url';

type RouteCollectionItem = readonly [RouteComponent, URLPattern];

function* map(routes: RouteDefinition): Generator<RouteCollectionItem, void> {
	for (const path in routes) {
		const component = routes[path]!;

		yield [component, new URLPattern(path)];
	}
}

class RouteCollection implements Iterable<RouteCollectionItem> {
	readonly #items: ReadonlyMap<RouteComponent, URLPattern>;

	public constructor(routes: RouteDefinition) {
		this.#items = new Map(map(routes));
	}

	public url(component: RouteComponent, params?: Record<string, string | number | undefined>) {
		const pattern = this.#items.get(component);

		if (!pattern) {
			throw new Error();
		}

		return generatePath(pattern, params);
	}

	public component(pathname: string): readonly [RouteComponent, URLPatternResult] | null {
		for (const [component, pattern] of this.#items) {
			const match = pattern.exec(pathname);

			if (match) {
				return [component, match];
			}
		}

		return null;
	}

	public [Symbol.iterator](): IterableIterator<RouteCollectionItem> {
		return this.#items.entries();
	}
}

function makeRoutes(routes: RouteDefinition) {
	return new RouteCollection(routes);
}

export { RouteCollection, makeRoutes };
