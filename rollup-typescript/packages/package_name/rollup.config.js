import path from 'path';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import sass from 'sass';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const resolve = function(...args) {
  return path.resolve(__dirname, ...args);
};

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const PRODUCTON_DIR = resolve('dist');
const STATIC_DIR = resolve('public');
const extensions = ['.js', '.ts'];

module.exports = () => {
  return [
    !IS_DEVELOPMENT && {
      input: resolve('./src/index.ts'),
      output: [
        {
          format: 'umd',
          name: 'package_name',
          file: resolve(pkg.main),
        },
        {
          format: 'es',
          file: resolve(pkg.module),
        },
      ],
      plugins: [
        nodeResolve({
          extensions,
          modulesOnly: true,
        }),
        commonjs({
          sourceMap: false,
        }),
        babel({
          extensions,
          exclude: 'node_modules/**',
        }),
        scss({
          sass,
          processor: () => postcss([autoprefixer()]),
          output: resolve(PRODUCTON_DIR, 'package_name.css'),
          outputStyle: 'compressed',
        }),
      ],
    },

    IS_DEVELOPMENT && {
      input: resolve('./src/index.ts'),
      output: [
        {
          format: 'umd',
          name: 'package_name',
          file: resolve('dist/package_name.umd.js'),
        },
      ],
      plugins: [
        nodeResolve({
          extensions,
          modulesOnly: true,
        }),
        commonjs({
          sourceMap: false,
        }),
        babel({
          extensions,
          exclude: 'node_modules/**',
        }),
        serve({
          contentBase: [STATIC_DIR, PRODUCTON_DIR],
          open: true,
        }),
        livereload({
          watch: [STATIC_DIR, PRODUCTON_DIR],
        }),
        scss({
          sass,
          processor: () => postcss([autoprefixer()]),
          output: resolve(PRODUCTON_DIR, 'package_name.css'),
        }),
      ],
    },
  ].filter(Boolean);
};
