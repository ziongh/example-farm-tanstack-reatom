import type { FileRoutesByPath } from '@tanstack/react-router';

export type NavItem = {
	label: string;
	icon?: string;
	link: keyof FileRoutesByPath | '#';
	links?: NavItem[];
};
