import type { EvenBetterHistory } from './types/history';
import { EMPTY } from './helpers';

const windowHistory = window.history;

const replace = ['pushState', 'replaceState'] as const;

for (const name of replace) {
	const method = windowHistory[name];
	const type = name.toLowerCase();

	windowHistory[name] = function (this: History, data: any, title: string, url?: string | URL | null): void {
		method.call(this, data, title, url);
		window.dispatchEvent(new Event(type));
	};
}

const $history: EvenBetterHistory = Object.freeze({
	push(url?: string | URL | null) {
		windowHistory.pushState(undefined, EMPTY, url);
	},
	replace(url?: string | URL | null) {
		windowHistory.replaceState(undefined, EMPTY, url);
	},
});

export { $history };
