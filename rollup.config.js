import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

import fs from 'fs';
import pkg from './package.json';

export default fs
	.readdirSync(pkg.srcDir)
	.map(mod => ({
		input: pkg.srcDir + mod,
		output: {
			file: pkg.outDir + mod + (mod.indexOf('.js') === -1 ? '.js' : ''),
			format: 'umd',
			name: `${mod}`
		},
		plugins: [
			svelte({
				customElement: true,
			}),
			resolve(),
			terser(),
		]
	}))
