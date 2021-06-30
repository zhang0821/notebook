/**
 * @file test multi-skeleton
 * @author panyuqi (pyqiverson@gmail.com)
 */

/* eslint-disable fecs-use-standard-promise */

import 'babel-polyfill';
import * as path from 'path';
import Promise from 'bluebird';
import test from 'ava';
import {
    runWebpackCompilerMemoryFs,
    testFs,
    webpackMajorVersion
} from './utils.js';

import multipageConfig from '../examples/multi-skeleton/webpack.config.js';

const fs = testFs;

const multipageExamplePath = path.resolve(__dirname, '../examples/multi-skeleton');
const webpackBuildPath = path.resolve(multipageExamplePath, './dist');

const readFile = Promise.promisify(fs.readFile, {context: fs});

let webpackBuildStats = null;

if (webpackMajorVersion === '4') {
    test.skip('will not be run', t => {
        t.fail();
    });
}
else {

    test.before('run webpack build first', async t => {
        webpackBuildStats = await runWebpackCompilerMemoryFs(multipageConfig);
    });

    test('it should run successfully', async t => {
        let {errors, warnings} = webpackBuildStats;
        t.falsy(errors.length && warnings.length);
    });

    test('it should insert multi skeletons into index.html', async t => {
        let result = await readFile(path.join(webpackBuildPath, 'index.html'));
        let skeleton1DOM = '<div id=skeleton1 class=skeleton1-wrapper';
        t.true(result.toString().includes(skeleton1DOM));
    });
}
