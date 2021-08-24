import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import sass from 'sass';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alphaPkg from './packages/package-alpha/package.json';
import betaPkg from './packages/package-beta/package.json';

const resolve = (...args) => path.resolve(__dirname, ...args);
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const PRODUCTON_DIR = resolve('packages/package-alpha/dist');
const STATIC_DIR = resolve('public');
const extensions = ['.js', '.ts'];
const alphaPkgInfo = {
  name: 'alpha',
  path: 'packages/package-alpha',
  src: './src/index.ts',
  pkg: alphaPkg,
};
const pkgs = [
  alphaPkgInfo,
  {
    name: 'beta',
    path: 'packages/package-beta',
    src: './lib/index.ts',
    pkg: betaPkg,
  }
];
const prodConfig = pkgs.map((pkgInfo) => {
  const { name, pkg, path: pkgPath, src } = pkgInfo;
  const _config = {
    input: resolve(pkgPath, src),
    output: [
      {
        format: 'umd',
        name,
        file: resolve(pkgPath, pkg.main || `dist/${name}.umd.js`),
        globals: {
          '@babel/runtime/regenerator': 'regeneratorRuntime',
        },
      },
      {
        format: 'es',
        file: resolve(pkgPath, pkg.module || `dist/${name}.es.js`),
      },
    ],
    external: [/@babel\/runtime\/regenerator/, /regenerator\-runtime/],
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      commonjs({
        sourceMap: false,
      }),
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
      typescript({
        tsconfig: './tsconfig.json',
        cacheRoot: '.yarn/.cache/rollup-plugin-typescript2',
      }),
    ],
  };

  return _config;
});
// 开发模式只启用播放器模块
const devConfig = (function() {
  const { name, pkg, path: pkgPath, src } = alphaPkgInfo;

  return {
    input: resolve(pkgPath, src),
    output: [
      {
        format: 'umd',
        name,
        file: resolve(pkgPath, pkg.main || `dist/${name}.umd.js`),
        globals: {
          '@babel/runtime/regenerator': 'regeneratorRuntime',
        },
      },
    ],
    external: [/@babel\/runtime\/regenerator/, /regenerator\-runtime/],
    plugins: [
      nodeResolve({
        extensions,
        modulesOnly: true,
      }),
      commonjs({
        sourceMap: false,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        cacheRoot: '.yarn/.cache/rollup-plugin-typescript2',
      }),
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
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
        output: resolve(PRODUCTON_DIR, 'alpha.css'),
      }),
    ],
  };
})();
const config = [];

if (IS_DEVELOPMENT) {
  config.push(devConfig);
} else {
  config.push(...prodConfig);
}

export default () => config;
