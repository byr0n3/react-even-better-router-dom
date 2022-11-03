import type { ComponentPropsWithRef, ComponentType, FunctionComponent, LazyExoticComponent } from 'react';
import { createElement, Suspense, useEffect, useMemo, useState } from 'react';
import type { RouteCollection } from '../helpers/routes';
import type { ComponentProps } from '../types/routes';
import { addPopStateListener, addPushStateListener, addReplaceStateListener } from '../events';
import { $flusher } from '../helpers/flusher';
import { sanitizePath } from '../helpers/url';
import { isLazy } from '../helpers/is';

type Props<T extends ComponentType = ComponentType> = ComponentProps & ComponentPropsWithRef<T>;

interface RouterProps {
	readonly routes: RouteCollection;
	readonly fallback?: FunctionComponent;
}

function getCurrentPath() {
	return sanitizePath(window.location.pathname);
}

function wrapSuspense<T extends ComponentType>(component: LazyExoticComponent<T>, props: Props<T>) {
	return createElement(Suspense, { children: createElement(component, props) });
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

	function getCurrentComponent() {
		const result = routes.component(path);

		if (result) {
			const [component, match] = result;

			const props = { match: match.pathname.groups } as Props;

			const lazy = isLazy(component);

			if (lazy) {
				return wrapSuspense(component, props);
			}

			return createElement(component as FunctionComponent, props);
		}

		if (fallback) {
			return createElement(fallback);
		}

		return null;
	}

	return useMemo(getCurrentComponent, [path]);
}

export { Router };
