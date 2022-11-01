import type { EventListener } from './types/events';

function addPopStateListener(callback: EventListener<PopStateEvent>) {
	window.addEventListener('popstate', callback);
	return function () {
		window.removeEventListener('popstate', callback);
	};
}

function addPushStateListener(callback: EventListener) {
	window.addEventListener('pushstate', callback);
	return function () {
		window.removeEventListener('pushstate', callback);
	};
}

function addReplaceStateListener(callback: EventListener) {
	window.addEventListener('replacestate', callback);
	return function () {
		window.removeEventListener('replacestate', callback);
	};
}

export { addPopStateListener, addPushStateListener, addReplaceStateListener };
