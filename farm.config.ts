import path from 'node:path';
import { defineConfig } from '@farmfe/core';
import farmJsPluginPostcss from '@farmfe/js-plugin-postcss';
import preact from '@preact/preset-vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
	envDir: './env',
	plugins: [
		farmJsPluginPostcss({
			// filters: {
			// 	// all files end with .custom-css will be processed
			// 	resolvedPaths: ['\\.module.css$'],
			// 	moduleTypes: ['css'],
			// },
		}),
	],
	vitePlugins: [
		preact({
			devToolsEnabled: true,
		}),
		TanStackRouterVite({ routesDirectory: 'src/routes' }),
	],
	publicDir: 'public',
	compilation: {
		persistentCache: true,
		external: ['uno.css', 'virtual:svg-icons-register'],
		resolve: {
			alias: {
				'@/routes': path.resolve(process.cwd(), 'src/routes'),
				'@/pages': path.resolve(process.cwd(), 'src/pages'),
				'@/layouts': path.resolve(process.cwd(), 'src/layouts'),
				'@/features': path.resolve(process.cwd(), 'src/features'),
				'@/types': path.resolve(process.cwd(), 'src/types'),
				'@/assets': path.resolve(process.cwd(), 'src/assets'),
				'@/tests': path.resolve(process.cwd(), './tests'),
				'react-is': 'preact/compat',
				'react-focus-lock': path.resolve(
					process.cwd(),
					'node_modules/react-focus-lock',
				),
				'react-fast-compare': path.resolve(
					process.cwd(),
					'node_modules/react-fast-compare',
				),
				'react-remove-scroll': path.resolve(
					process.cwd(),
					'node_modules/react-remove-scroll',
				),
				'react-clientside-effect': path.resolve(
					process.cwd(),
					'node_modules/react-clientside-effect',
				),
				'react-style-singleton': path.resolve(
					process.cwd(),
					'node_modules/react-style-singleton',
				),
				'react-number-format': path.resolve(
					process.cwd(),
					'node_modules/react-number-format',
				),
				'react-textarea-autosize': path.resolve(
					process.cwd(),
					'node_modules/react-textarea-autosize',
				),
				'react-transition-group': path.resolve(
					process.cwd(),
					'node_modules/react-transition-group',
				),
				'react-i18next': path.resolve(
					process.cwd(),
					'node_modules/react-i18next',
				),
				'react-node-key': path.resolve(
					process.cwd(),
					'node_modules/react-node-key',
				),
				'react-draggable': path.resolve(
					process.cwd(),
					'node_modules/react-draggable',
				),
				'@hookstate/core': path.resolve(
					process.cwd(),
					'node_modules/@hookstate/core',
				),
				'react-remove-scroll-bar': path.resolve(
					process.cwd(),
					'node_modules/react-remove-scroll-bar',
				),
			},
		},
		output: {
			path: 'dist',
			publicPath: '/',
			targetEnv: 'browser',
		},
	},
});
