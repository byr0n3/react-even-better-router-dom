<img alt="Logo" style="display: block;margin: 0 auto -26px;" src="logo.png">

# React Even Better Router DOM

[![npm webpage](https://img.shields.io/npm/v/react-even-better-router-dom?color=0c72cc)](https://www.npmjs.com/package/react-even-better-router-dom)
[![package license](https://img.shields.io/github/license/byr0n3/react-even-better-router-dom)](https://github.com/byr0n3/react-even-better-router-dom/blob/master/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-even-better-router-dom)](https://bundlephobia.com/package/react-even-better-router-dom)

Because every other router just doesn't cut it anymore 🤡

## Motivation

Because React sucks and every React Router sucks
and everything sucks and being a web developer is a worse crime
than attempted murder at this point.

## Install

```sh
yarn add react-even-better-router-dom
```

## Usage

### Basic

```tsx
import { Router, makeRoutes } from 'react-even-better-router-dom';

function Home() {
	return (
		<h1>Home</h1>
	);
}

function Test() {
	return (
		<h1>Test</h1>
	);
}

function NotFound() {
	return (
		<span>404 not found</span>
	);
}

const ROUTES = makeRoutes({
	'': Home,
	'/test': Test,
});

function App() {
	return (
		<div>
			<Router
				routes={ ROUTES }
				fallback={ NotFound }
			/>
		</div>
	);
}
```

### Dynamic routes

```tsx
import { Router, makeRoutes } from 'react-even-better-router-dom';
import type { RouteComponentProps } from 'react-even-better-router-dom';

function Home() {
	return (
		<h1>Home</h1>
	);
}

function Project(props: RouteComponentProps) {
	const project = props.match.project;

	return (
		<h1>Project ID: { project }</h1>
	);
}

function NotFound() {
	return (
		<span>404 not found</span>
	);
}

const ROUTES = makeRoutes({
	'': Home,
	// `(\\d+)` is used to only parse integer values
	'/project/:project(\\d+)': Project,
});

function App() {
	return (
		<div>
			<Router
				routes={ ROUTES }
				fallback={ NotFound }
			/>
		</div>
	);
}
```

### Lazy Loading

```tsx
import { Router, makeRoutes } from 'react-even-better-router-dom';

// Lazy imports to only load the current page when it's actually needed
// The Router component will automagically wrap your component in a <Suspense> component
const Home = lazy(() => import('./pages/Home'));
const Test = lazy(() => import('./pages/About'));

function NotFound() {
	return (
		<span>404 not found</span>
	);
}

const ROUTES = makeRoutes({
	'': Home,
	'/test': Test,
});

function App() {
	return (
		<div>
			<Router
				routes={ ROUTES }
				fallback={ NotFound }
			/>
		</div>
	);
}
```

### Navigating to different routes

```tsx
import { Router, Link, makeRoutes } from 'react-even-better-router-dom';

function Home() {
	// A RouteCollection has a helper function called 'url'. 
	// This takes a FunctionComponent as an argument.
	// It returns a string to the route of the given component.
	const href = ROUTES.url(Test);

	return (
		<div>
			<h1>Home</h1>
			<Link href={ href }>Go to test page</Link>
		</div>
	);
}

function Test() {
	return (
		<h1>Test</h1>
	);
}

function NotFound() {
	return (
		<span>404 not found</span>
	);
}

const ROUTES = makeRoutes({
	'': Home,
	'/test': Test,
});

function App() {
	return (
		<div>
			<Router
				routes={ ROUTES }
				fallback={ NotFound }
			/>
		</div>
	);
}
```

## Types

The project is made in TypeScript, hope this tells you enough.

## Contributing

Just don't
