function $flusher(items: VoidFunction[]) {
	const callbacks = [...items];

	function add(item: VoidFunction | undefined) {
		if (item) {
			callbacks.push(item);
		}
	}

	function flush() {
		while (!!callbacks.length) {
			const callback = callbacks.shift();
			callback?.();
		}
	}

	return Object.freeze({
		add,
		flush,
	});
}

export { $flusher };
