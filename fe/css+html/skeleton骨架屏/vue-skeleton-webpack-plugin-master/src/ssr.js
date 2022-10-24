/**
 * @file ssr
 * @desc Use vue ssr to render skeleton components. The result contains html and css.
 * @author panyuqi <panyuqi@baidu.com>
 */

/* eslint-disable no-console, fecs-no-require */

const path = require('path');
const webpack = require('webpack');
const webpackMajorVersion = require('webpack/package.json').version.split('.')[0];
const NodeTemplatePlugin = require('webpack/lib/node/NodeTemplatePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const LoaderTargetPlugin = require('webpack/lib/LoaderTargetPlugin');
const LibraryTemplatePlugin = require('webpack/lib/LibraryTemplatePlugin');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
const ExternalsPlugin = require('webpack/lib/ExternalsPlugin');

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const nodeExternals = require('webpack-node-externals');

let MiniCssExtractPlugin;
let ExtractTextPlugin;
if (webpackMajorVersion === '4') {
    MiniCssExtractPlugin = require('mini-css-extract-plugin');
}
else {
    ExtractTextPlugin = require('extract-text-webpack-plugin');
}

module.exports = function renderSkeleton (serverWebpackConfig, {quiet = false, compilation, context}) {
    let {path: outputPath, publicPath: outputPublicPath} = compilation.outputOptions;
    // get entry name from webpack.conf
    let outputJSPath = path.join(outputPath, serverWebpackConfig.output.filename);
    let outputBasename = path.basename(outputJSPath, path.extname(outputJSPath));
    let outputCssBasename = `${outputBasename}.css`;
    let outputCSSPath = path.join(outputPath, outputCssBasename);

    if (!quiet) {
        console.log(`Generate skeleton for ${outputBasename}...`);
    }

    let originalRules;
    if (webpackMajorVersion !== '4') {
        // if user passed in some special module rules for Skeleton, use it directly
        originalRules = compilation.options.module.rules;
        if (serverWebpackConfig.module && serverWebpackConfig.module.rules) {
            compilation.options.module.rules = serverWebpackConfig.module.rules;
        }
        else {
            // otherwise use rules from parent compiler
            let vueRule = compilation.options.module.rules.find(rule => {
                return rule.test && rule.test.test && rule.test.test('test.vue');
            });

            if (vueRule && vueRule.use && vueRule.use.length) {
                let vueLoader = vueRule.use.find(rule => {
                    return rule.loader = 'vue-loader';
                });

                vueLoader.options.extractCSS = true;
                delete vueLoader.options.loaders;
            }
        }
    }

    const outputOptions = {
        filename: outputJSPath,
        publicPath: outputPublicPath
    };

    const childCompiler = compilation.createChildCompiler('vue-skeleton-webpack-plugin-compiler', outputOptions);

    childCompiler.context = context;
    new LibraryTemplatePlugin(undefined, 'commonjs2').apply(childCompiler);
    new NodeTargetPlugin().apply(childCompiler);
    if (Array.isArray(serverWebpackConfig.entry)) {
        new MultiEntryPlugin(context, serverWebpackConfig.entry, undefined).apply(childCompiler);
    }
    else {
        new SingleEntryPlugin(context, serverWebpackConfig.entry, undefined).apply(childCompiler);
    }
    new LoaderTargetPlugin('node').apply(childCompiler);
    new ExternalsPlugin('commonjs2', serverWebpackConfig.externals || nodeExternals({
        whitelist: /\.css$/
    })).apply(childCompiler);
    if (webpackMajorVersion === '4') {
        new MiniCssExtractPlugin({
            filename: outputCSSPath
        }).apply(childCompiler);
    }
    else {
        new ExtractTextPlugin({
            filename: outputCSSPath
        }).apply(childCompiler);
    }

    return new Promise((resolve, reject) => {
        childCompiler.runAsChild((err, entries, childCompilation) => {
            if (childCompilation && childCompilation.errors && childCompilation.errors.length) {
                const errorDetails = childCompilation.errors.map(error => error.message + (error.error ? ':\n' + error.error : '')).join('\n');
                reject(new Error('Child compilation failed:\n' + errorDetails));
            }
            else if (err) {
                reject(err);
            }
            else {
                let bundle = childCompilation.assets[outputJSPath].source();
                let skeletonCSS = '';
                if (childCompilation.assets[outputCSSPath]) {
                    skeletonCSS = childCompilation.assets[outputCSSPath].source();
                }

                // delete JS & CSS files
                delete compilation.assets[outputJSPath];
                delete compilation.assets[outputCSSPath];
                delete compilation.assets[`${outputJSPath}.map`];
                delete compilation.assets[`${outputCSSPath}.map`];
                // create renderer with bundle
                let renderer = createBundleRenderer(bundle);
                // use vue ssr to render skeleton
                renderer.renderToString({}, (err, skeletonHTML) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (webpackMajorVersion !== '4') {
                            compilation.options.module.rules = originalRules;
                        }
                        resolve({skeletonHTML, skeletonCSS});
                    }
                });
            }
        });
    });
};
