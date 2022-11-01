import type { FunctionComponent } from 'react';
import { createElement, useEffect, useMemo, useState } from 'react';
import { addPopStateListener, addPushStateListener, addReplaceStateListener } from '../events';
import { $flusher } from '../helpers/flusher';

type RouteDefinition = Record<string, FunctionComponent>;

interface RouterProps {
	readonly routes: RouteDefinition;
	readonly fallback?: FunctionComponent;
}

const SLASH = '/';

function sanitizePath(value: string) {
	if (value.slice(0, SLASH.length) !== SLASH) {
		return SLASH + value;
	}

	return value;
}

function Router({ routes, fallback }: RouterProps) {
	const [path, setPath] = useState<string>(getCurrentPath());

	useEffect(function () {
		const flusher = $flusher([
			addPopStateListener(updateComponent),
			addPushStateListener(updateComponent),
			addReplaceStateListener(updateComponent),
		]);

		return flusher.flush;
	}, []);

	function updateComponent() {
		setPath(getCurrentPath());
	}

	function getCurrentPath() {
		return sanitizePath(window.location.pathname);
	}

	function getCurrentComponent() {
		for (const key in routes) {
			if (sanitizePath(key) === path) {
				return createElement(routes[key]!);
			}
		}

		if (fallback) {
			return createElement(fallback);
		}

		return null;
	}

	return useMemo(getCurrentComponent, [path]);
}

export { Router };
