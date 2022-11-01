import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { addPopStateListener, addPushStateListener, addReplaceStateListener } from '../events';

type RouteDefinition = Record<string, ReactNode>;

interface RouterProps {
	readonly routes: RouteDefinition;
	readonly fallback?: ReactNode;
}

const SLASH = '/';

function ensurePrefix(value: string) {
	if (value.slice(0, SLASH.length) !== SLASH) {
		return SLASH + value;
	}

	return value;
}

function Router({ routes, fallback }: RouterProps) {
	const [component, setComponent] = useState<ReactNode>(getCurrentComponent());

	useEffect(function () {
		const unsubscribe = addPopStateListener(updateComponent);
		const unsubscribe1 = addPushStateListener(updateComponent);
		const unsubscribe2 = addReplaceStateListener(updateComponent);

		return function () {
			unsubscribe();
			unsubscribe1();
			unsubscribe2();
		};
	}, []);

	function updateComponent() {
		setComponent(getCurrentComponent());
	}

	function getCurrentComponent() {
		const path = ensurePrefix(window.location.pathname);

		for (const key in routes) {
			if (ensurePrefix(key) === path) {
				return routes[key];
			}
		}

		return fallback ?? null;
	}

	return component;
}

export { Router };
