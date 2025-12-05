// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

// --- Configuration Variables ---
const libraryName = "NepaliDateConverter"; // The global variable name for browser access
const input = "src/index.js"; // Assuming your main logic is here

export default [
  // 1. ES Module (for bundlers like Webpack, Rollup)
  {
    input: input,
    output: {
      file: pkg.module, // specified in package.json (e.g., dist/nepali-bs-date-converter.esm.js)
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve(), // Locates third-party modules in node_modules
      commonjs(), // Converts CommonJS modules to ES6
    ],
  },

  // 2. UMD Bundle (for CDN/Browser and Node Require)
  {
    input: input,
    output: {
      file: pkg.main, // specified in package.json (e.g., dist/nepali-bs-date-converter.umd.js)
      format: "umd",
      name: libraryName,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      // Optional: Include Babel if you need to support older browsers.
      // import babel from '@rollup/plugin-babel';
      // babel({
      //     babelHelpers: 'bundled',
      //     exclude: 'node_modules/**',
      //     presets: ['@babel/env']
      // }),
    ],
  },

  // 3. UMD Minified Bundle (for Production CDN)
  {
    input: input,
    output: {
      file: pkg.main.replace(".js", ".min.js"), // e.g., dist/nepali-bs-date-converter.min.js
      format: "umd",
      name: libraryName,
      sourcemap: false,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser({ compress: true }), // Minify the final output
    ],
  },
];
