import Logo from '@/assets/preact.svg';
import classes from '@/layouts/Navbar.module.css';
import type { NavItem } from '@/types/nav-item';
import {
	AppShell,
	Burger,
	Group,
	Image,
	NavLink,
	ScrollArea,
	useComputedColorScheme,
} from '@mantine/core';
import { Link, useRouterState } from '@tanstack/react-router';
import { memo } from 'preact/compat';

export function MenuNavBar({ data }: MenuNavBarProps) {
	const path = useRouterState();
	return (
		<AppShell.Section
			grow
			component={ScrollArea}>
			<div className={classes.linksInner}>
				{data.map((item) => (
					<NavItemComponent
						key={item.label}
						item={item}
						path={path}
					/>
				))}
			</div>
		</AppShell.Section>
	);
}

// eslint-disable-next-line react/display-name
export const NavItemComponent = memo(
	({ item, path, depth = 0 }: { item: NavItem; path: any; depth?: number }) => {
		return (
			<NavLink
				key={item.label}
				href={item.link}
				to={item.link}
				component={Link}
				label={item.label}
				leftSection={<div className={item.icon} />}
				active={
					item.link === path.location.pathname &&
					!item.links?.some(
						(subitem) => subitem.link === path.location.pathname,
					)
				}
				childrenOffset={28 - depth * 4}
				defaultOpened={item.links?.some(
					(subitem) => subitem.link === path.location.pathname,
				)}>
				{item.links?.map((subitem) => (
					<NavItemComponent
						key={subitem.label}
						item={subitem}
						path={path}
						depth={depth + 1}
					/>
				))}
			</NavLink>
		);
	},
	(prevProps, nextProps) => {
		// Add your custom comparison logic here
		return prevProps.path === nextProps.path;
	},
);

export interface MenuNavBarProps {
	data: NavItem[];
}

interface MenuNavBarHeaderProps {
	mobileOpened: boolean;
	toggleMobile: () => void;
}

export function MenuNavBarHeaderMobile({
	mobileOpened,
	toggleMobile,
}: MenuNavBarHeaderProps) {
	const computedColorScheme = useComputedColorScheme('light', {
		getInitialValueInEffect: true,
	});
	return (
		<AppShell.Section>
			<Group
				w='100%'
				justify='space-between'>
				<Image
					src={Logo}
					alt='Avatar'
					style={{ width: '80%' }}
				/>
				<Burger
					opened={mobileOpened}
					onClick={toggleMobile}
					hiddenFrom='sm'
					size='sm'
					aria-label='Toggle navigation'
					style={{ float: 'right' }}
				/>
			</Group>
		</AppShell.Section>
	);
}
