import type { LinkHTMLAttributes, MouseEvent } from 'react';
import { $history } from '../history';

function Link({ onClick: $onClick, children, ...props }: LinkHTMLAttributes<HTMLAnchorElement>) {
	function onClick(event: MouseEvent<HTMLAnchorElement>) {
		const $this = event.currentTarget;

		if ($onClick) {
			$onClick.call($this, event);
		}

		if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0) {
			return;
		}

		event.preventDefault();

		const href = $this.href;

		window.queueMicrotask(function () {
			$history.push(href);
		});
	}

	return (
		<a { ...props } onClick={ onClick }>{ children }</a>
	);
}

export { Link };
