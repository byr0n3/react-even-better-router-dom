import type { FunctionComponent } from 'react';

type RouteComponent = FunctionComponent | FunctionComponent<RouteComponentProps>;

type RouteDefinition = Record<string, RouteComponent>;

type ComponentProps = Record<string, string | number | undefined>;

type RouteComponentProps = {
	readonly match: ComponentProps;
}

export type { RouteComponent, RouteDefinition, ComponentProps, RouteComponentProps };
