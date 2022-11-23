import type { RouterProps } from './interface';
import type { ComponentProps } from '../../types/routes';
import type { ComponentType, FunctionComponent, LazyExoticComponent } from 'react';
import { createElement, Suspense, useEffect, useMemo, useState } from 'react';
import { addPopStateListener, addPushStateListener, addReplaceStateListener } from '../../events.js';
import { $flusher } from '../../helpers/flusher.js';
import { sanitizePath } from '../../helpers/url.js';

const LAZY_SYMBOL = Symbol.for('react.lazy');

function isLazy<T extends ComponentType>(value: any): value is LazyExoticComponent<T> {
	return !!value && value.$$typeof === LAZY_SYMBOL;
}

function Router({ routes, fallback }: RouterProps) {
	const [path, setPath] = useState<string>(sanitizePath(window.location.pathname));

	useEffect(function () {
		return $flusher([
			addPopStateListener(updatePath),
			addPushStateListener(updatePath),
			addReplaceStateListener(updatePath),
		]).flush;
	}, []);

	function updatePath() {
		setPath(sanitizePath(window.location.pathname));
	}

	function getCurrentComponent() {
		const result = routes.component(path);

		if (!result) {
			return fallback ? createElement(fallback) : null;
		}

		const [component, match] = result;

		const props = { match: match.pathname.groups } as ComponentProps;

		if (isLazy(component)) {
			return createElement(Suspense, { children: createElement(component, props) });
		}

		return createElement(component as FunctionComponent, props);
	}

	return useMemo(getCurrentComponent, [path]);
}

export { Router };
