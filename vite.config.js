/* eslint-disable no-undef */
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	plugins: [
		react(),
		svgrPlugin({
			svgrOptions: {
				icon: true,
				// ...svgr options (https://react-svgr.com/docs/options/)
			},
		}),
	],
	optimizeDeps: {
		include: [
			'formik',
			'yup',
			'axios',
			'react-redux',
			'@reduxjs/toolkit',
			'antd',
		],
	},
})
