import type { RouterProps } from './interface';
import type { ComponentProps } from '../../types/routes';
import type { ComponentType, FunctionComponent, LazyExoticComponent } from 'react';
import { createElement, Suspense, useEffect, useMemo, useState } from 'react';
import { addPopStateListener, addPushStateListener, addReplaceStateListener } from '../../events.js';
import { flusher } from '../../helpers/flusher.js';
import { sanitizePath } from '../../helpers/url.js';
import { PostNavigationFocusOptions, PostNavigationOptions } from './helpers.js';
import { isString } from '../../helpers/is.js';

const LAZY_SYMBOL = Symbol.for('react.lazy');

function isLazy<T extends ComponentType>(value: any): value is LazyExoticComponent<T> {
	return !!value && value.$$typeof === LAZY_SYMBOL;
}

function scrollToTop(postNavigation: PostNavigationOptions | undefined) {
	if (postNavigation === undefined) {
		return;
	}

	window.scroll({
		top: 0,
		left: 0,
		behavior: postNavigation === PostNavigationOptions.ScrollTopSmooth ? 'smooth' : 'auto',
	});
}

function focusElement(postNavigationFocus: PostNavigationFocusOptions | string | undefined) {
	if (postNavigationFocus === undefined) {
		return;
	}

	if (isString(postNavigationFocus)) {
		window.document.getElementById(postNavigationFocus)?.focus();
		return;
	}

	switch (postNavigationFocus) {
		case PostNavigationFocusOptions.FocusBody:
			window.document.body.focus();
			break;
		case PostNavigationFocusOptions.FocusHeading:
			const elem = window.document.querySelector('h1');

			if (!elem) {
				return;
			}

			elem.tabIndex = -1;
			elem.focus();
			break;
	}
}

function Router({ routes, fallback, postNavigation, postNavigationFocus }: RouterProps) {
	const [path, setPath] = useState<string>(sanitizePath(window.location.pathname));

	useEffect(function () {
		return flusher([
			addPopStateListener(updatePath),
			addPushStateListener(updatePath),
			addReplaceStateListener(updatePath),
		]).flush;
	}, []);

	useEffect(() => {
		scrollToTop(postNavigation);
		focusElement(postNavigationFocus);
	}, [path]);

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
