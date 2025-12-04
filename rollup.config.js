import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  // ESM build
  {
    input: "src/index.js",
    output: {
      file: "dist/nepali-date-converter.esm.js",
      format: "esm",
      sourcemap: true
    },
    plugins: [resolve(), commonjs()]
  },
  // UMD build
  {
    input: "src/index.js",
    output: {
      file: "dist/nepali-date-converter.umd.js",
      format: "umd",
      name: "NepaliDateConverter", // global variable in browser
      sourcemap: true
    },
    plugins: [resolve(), commonjs(), terser()]
  }
];
