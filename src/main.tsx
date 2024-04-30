// This is the main entry point for your app
import 'preact/debug';
import classes from '@/assets/styles/css/active.module.css';
import '@/assets/styles/css/global.css';
import { globalCtx } from '@/features/ctx';
import { RouterSync } from '@/features/models/route';
import { AuthProvider, useAuth } from '@/types/auth';
import {
	Button,
	ColorSchemeScript,
	type DefaultMantineColor,
	Loader,
	MantineProvider,
	createTheme,
	localStorageColorSchemeManager,
	rem,
} from '@mantine/core';
import '@mantine/core/styles.css';
// other css files are required only if
// you are using components from the corresponding package
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { reatomContext } from '@reatom/npm-react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { render } from 'preact';
import { StrictMode } from 'react';
import 'uno.css';
import { routeTree } from './routeTree.gen';

// Create a new router instance
export const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	context: {
		// auth will initially be undefined
		// We'll be passing down the auth state from within a React component
		auth: undefined!,
	},
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const primaryColor: DefaultMantineColor = 'blue';

const theme = createTheme({
	fontFamily: 'Open Sans, sans-serif',
	fontFamilyMonospace: 'Monaco, Courier, monospace',
	headings: { fontFamily: 'Greycliff CF, sans-serif' },
	primaryColor: primaryColor,
	primaryShade: 8,
	white: '#eee',
	black: '#111',
	activeClassName: classes.active,
	luminanceThreshold: 0.3,
	autoContrast: true,
	defaultRadius: 'md',
	cursorType: 'pointer',
	defaultGradient: {
		from: 'cyan',
		to: primaryColor,
		deg: 45,
	},
	fontSizes: {
		xs: rem(10),
		sm: rem(11),
		md: rem(14),
		lg: rem(16),
		xl: rem(20),
	},
	lineHeights: {
		xs: '1.4',
		sm: '1.45',
		md: '1.55',
		lg: '1.6',
		xl: '1.65',
	},
	components: {
		Button: Button.extend({
			defaultProps: {
				color: primaryColor,
				variant: 'outline',
			},
		}),
		Loader: Loader.extend({
			defaultProps: {
				loaders: { ...Loader.defaultLoaders },
				type: 'ring',
			},
		}),
	},
});

const colorSchemeManager = localStorageColorSchemeManager({
	key: 'my-app-color-scheme',
});

function InnerApp() {
	const auth = useAuth();
	console.log('rerendered InnerApp');
	return (
		<>
			<ColorSchemeScript defaultColorScheme='auto' />
			<MantineProvider
				defaultColorScheme='auto'
				theme={theme}
				colorSchemeManager={colorSchemeManager}>
				<Notifications
					position='bottom-right'
					zIndex={1000}
				/>
				<ModalsProvider>
					<StrictMode>
						<RouterProvider
							router={router}
							context={{ auth }}
						/>
					</StrictMode>
				</ModalsProvider>
			</MantineProvider>
		</>
	);
}

function App() {
	return (
		<reatomContext.Provider value={globalCtx}>
			<AuthProvider>
				<InnerApp />
			</AuthProvider>
		</reatomContext.Provider>
	);
}

render(<App />, document.getElementById('app')!);
