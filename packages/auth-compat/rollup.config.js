/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import { emitModulePackageFile } from '../../scripts/build/rollup_emit_module_package_file';
import pkg from './package.json';

const deps = Object.keys(
  Object.assign({}, pkg.peerDependencies, pkg.dependencies)
);

/**
 * Common plugins for all builds
 */
const commonPlugins = [json(), resolve()];

const es5BuildPlugins = [
  ...commonPlugins,
  typescriptPlugin({
    typescript
  })
];

const es2017BuildPlugins = [
  ...commonPlugins,
  typescriptPlugin({
    typescript,
    tsconfigOverride: {
      compilerOptions: {
        target: 'es2017'
      }
    }
  })
];

const browserBuilds = [
  {
    input: 'index.ts',
    output: [{ file: pkg.esm5, format: 'es', sourcemap: true }],
    plugins: es5BuildPlugins,
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    treeshake: {
      moduleSideEffects: false
    }
  },
  {
    input: 'index.ts',
    output: {
      file: pkg.browser,
      format: 'es',
      sourcemap: true
    },
    plugins: es2017BuildPlugins,
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    treeshake: {
      moduleSideEffects: false
    }
  },
  {
    input: 'index.ts',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: es2017BuildPlugins,
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    treeshake: {
      moduleSideEffects: false
    }
  }
];

const nodeBuilds = [
  {
    input: 'index.node.ts',
    output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
    plugins: es5BuildPlugins,
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    treeshake: {
      moduleSideEffects: true
    }
  },
  {
    input: 'index.node.ts',
    output: [
      { file: pkg.exports['.'].node.import, format: 'es', sourcemap: true }
    ],
    plugins: [...es2017BuildPlugins, emitModulePackageFile()],
    external: id => deps.some(dep => id === dep || id.startsWith(`${dep}/`)),
    treeshake: {
      moduleSideEffects: true
    }
  }
];

const umdBuild = {
  input: `./index.ts`,
  output: {
    compact: true,
    file: `dist/firebase-auth.js`,
    format: 'umd',
    sourcemap: true,
    extend: true,
    name: 'firebase',
    globals: {
      '@firebase/app-compat': 'firebase',
      '@firebase/app': 'firebase.INTERNAL.modularAPIs'
    },
    /**
     * use iife to avoid below error in the old Safari browser
     * SyntaxError: Functions cannot be declared in a nested block in strict mode
     * https://github.com/firebase/firebase-js-sdk/issues/1228
     *
     */
    intro: `
           try {
             (function() {`,
    outro: `
           }).apply(this, arguments);
         } catch(err) {
             console.error(err);
             throw new Error(
               'Cannot instantiate firebase-auth.js - ' +
               'be sure to load firebase-app.js first.'
             );
           }`
  },
  plugins: [...es5BuildPlugins, uglify()],
  external: ['@firebase/app-compat', '@firebase/app']
};

export default [...browserBuilds, ...nodeBuilds, umdBuild];
