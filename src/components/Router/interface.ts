import type { FunctionComponent } from 'react';
import type { RouteCollection } from '../../helpers/routes';

interface RouterProps {
	readonly routes: RouteCollection;
	readonly fallback?: FunctionComponent;
}

export type { RouterProps };
