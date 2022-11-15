import type { RouterProps } from './interface';
import type { ComponentProps } from '../../types/routes';
import type { FunctionComponent } from 'react';
import { createElement, Suspense, useEffect, useMemo, useState } from 'react';
import { addPopStateListener, addPushStateListener, addReplaceStateListener } from '../../events';
import { $flusher } from '../../helpers/flusher';
import { sanitizePath } from '../../helpers/url';
import { isLazy } from '../../helpers/is';

function Router({ routes, fallback }: RouterProps) {
	const [path, setPath] = useState<string>(sanitizePath(window.location.pathname));

	useEffect(function () {
		const flusher = $flusher([
			addPopStateListener(updateComponent),
			addPushStateListener(updateComponent),
			addReplaceStateListener(updateComponent),
		]);

		return flusher.flush;
	}, []);

	function updateComponent() {
		setPath(sanitizePath(window.location.pathname));
	}

	function getCurrentComponent() {
		const result = routes.component(path);

		if (result) {
			const [component, match] = result;

			const props = { match: match.pathname.groups } as ComponentProps;

			const lazy = isLazy(component);

			if (lazy) {
				return createElement(Suspense, { children: createElement(component, props) });
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
