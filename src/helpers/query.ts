function queryStringify(value: Record<string, string | number | undefined>, exclude?: string[]): string {
	let result = '';

	for (const key of Object.keys(value)) {
		if (exclude && exclude.indexOf(key) !== -1) {
			continue;
		}

		let item = value[key];

		if (!item) {
			continue;
		}

		if (result) {
			result += '&';
		}

		result += key + '=' + item;
	}

	if (!result) {
		return result;
	}

	return '?' + result;
}

export { queryStringify };
