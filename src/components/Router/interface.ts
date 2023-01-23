import type { FunctionComponent } from 'react';
import type { RouteCollection } from '../../helpers/routes';
import type { PostNavigationFocusOptions, PostNavigationOptions } from './helpers';

interface RouterProps {
	readonly routes: RouteCollection;
	readonly fallback?: FunctionComponent;
	readonly postNavigation?: PostNavigationOptions | undefined;
	readonly postNavigationFocus?: PostNavigationFocusOptions | string | undefined;
}

export type { RouterProps };
