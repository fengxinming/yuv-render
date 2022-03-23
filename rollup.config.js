import { emptyDir } from 'fs-extra';
import { join } from 'path';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import camelCase from 'lodash/camelCase';

const externals = [
  'tslib'
].map((n) => new RegExp(`^${n}/?`));

// ts 转 es 语法
function ts2es(src, dest) {
  return defineConfig({
    input: src,
    external: externals,
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __VERSION__: pkg.version
        }
      }),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      // nodeResolve(),
      // commonjs(),
      copy({
        targets: [
          { src: 'package.json', dest: 'dist' },
          { src: 'README.md', dest: 'dist' }
        ]
      }),
      filesize()
    ],
    output: [{
      file: dest,
      format: 'esm',
      exports: 'auto'
    }, {
      file: dest.replace('esm', 'cjs'),
      format: 'cjs',
      exports: 'auto',
      externalLiveBindings: false
    }, {
      file: dest.replace('esm', 'umd'),
      format: 'umd',
      name: camelCase(pkg.name.slice(7)),
      exports: 'auto'
    }, {
      file: dest.replace('esm', 'umd.min'),
      format: 'umd',
      name: camelCase(pkg.name.slice(7)),
      exports: 'auto',
      plugins: [terser()]
    }]
  });
}

emptyDir(join(__dirname, 'dist'));

export default ts2es('src/index.ts', 'dist/esm.js');
