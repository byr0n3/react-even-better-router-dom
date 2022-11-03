import type { ComponentType, LazyExoticComponent } from 'react';

const LAZY_SYMBOL = Symbol.for('react.lazy');

function isNumber(value: any): value is number {
	return typeof value === 'number';
}

function isLazy<T extends ComponentType>(value: any): value is LazyExoticComponent<T> {
	return !!value && value.$$typeof === LAZY_SYMBOL;
}

export { isNumber, isLazy };
