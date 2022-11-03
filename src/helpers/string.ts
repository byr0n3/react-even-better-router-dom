import { isNumber } from './is';

const EMPTY = '';

function stringComparer(a: string, b: string): number {
	// noinspection IfStatementWithTooManyBranchesJS
	if (isNumber(a) && isNumber(b)) {
		return Number(a) - Number(b);
	} else if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	} else {
		return 0;
	}
}

export { EMPTY, stringComparer };
