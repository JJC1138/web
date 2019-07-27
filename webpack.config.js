'use strict';

const webpack = require('webpack');
const path = require('path');

const sourcePath = 'source';
const outPath = path.join(__dirname, 'site');

const test = process.env.npm_lifecycle_event === 'test';
const production = test || process.env.NODE_ENV === 'production';

let plugins = [];

if (production) {
    plugins = plugins.concat([
        // This is disabled for now because it doesn't currently support ES2015: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/33
        // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    ]);
}

if (test) plugins.push(new webpack.NoEmitOnErrorsPlugin());

const loaderTemplateForOurJS = {
    test: /\.js$/,
    include: path.join(__dirname, sourcePath),
};

module.exports = {
    entry: {
        'home': './' + path.join(sourcePath, 'home.js'),
        'cv': './' + path.join(sourcePath, 'cv.js'),
    },
    output: {
        path: outPath,
        filename: '[name].js',
    },
    module: {
        rules: [
            Object.assign({}, loaderTemplateForOurJS, {
                enforce: 'pre',
                loader: 'eslint-loader',
                query: {
                    failOnWarning: true,
                    failOnError: true,
                },
            }),
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: outPath,
    },
    plugins: plugins,
    devtool: production ? false : 'source-map',
    bail: test,
    mode: production ? 'production' : 'development',
};
