function flusher(items: VoidFunction[]) {
	function add(item: VoidFunction | undefined) {
		if (item) {
			items.push(item);
		}
	}

	function flush() {
		while (!!items.length) {
			const callback = items.shift();
			callback?.();
		}
	}

	return Object.freeze({
		add,
		flush,
	});
}

export { flusher };
