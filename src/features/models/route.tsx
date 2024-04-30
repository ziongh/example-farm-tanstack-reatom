import { useCtx } from '@reatom/npm-react';
import { updateFromSource, urlAtom } from '@reatom/url';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import React from 'react';

export const RouterSync = () => {
	const ctx = useCtx();
	const setupRef = React.useRef(false);

	// subscribe to location changes
	const path = useRouterState();
	if (ctx.get(urlAtom).href !== location.href && setupRef.current) {
		// do not use `useEffect` to prevent race conditions (`urlAtom` reading during the render)
		updateFromSource(ctx, new URL(location.href));
	}

	const navigate = useNavigate();
	if (!setupRef.current) {
		setupRef.current = true;
		urlAtom.settingsAtom(ctx, {
			init: () => new URL(location.href),
			sync: (_ctx, url, replace) =>
				navigate({ replace: replace, to: url.pathname, search: url.search }),
		});
		// trigger `onChange` hooks.
		urlAtom(ctx, new URL(location.href));
	}

	return null;
};
