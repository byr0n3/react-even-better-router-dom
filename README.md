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

```tsx
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

const ROUTES = {
	'': Home,
	'/test': Test,
};

function App() {
	return (
		<div>
			<Router
				routes={ ROUTES }
				fallback={ () => <span>404 Not found</span> }
			/>
		</div>
	);
}
```

## Types

The project is made in TypeScript, hope this tells you enough.

## Contributing

Just don't
