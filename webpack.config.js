'use strict';

const webpack = require('webpack');
const path = require('path');

const sourcePath = 'source';
const outPath = 'site';

const test = process.env.npm_lifecycle_event === 'test';
const production = test || process.env.NODE_ENV === 'production';

let plugins = [];

if (production) {
    plugins = plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    ]);
}

if (test) plugins.push(new webpack.NoErrorsPlugin());

const loaderTemplateForOurJS = {
    test: /\.js$/,
    include: path.join(__dirname, sourcePath),
};

module.exports = {
    entry: './' + path.join(sourcePath, 'main.js'),
    output: {
        path: outPath,
        filename: 'bundle.js',
    },
    module: {
        preLoaders: [
            Object.assign({}, loaderTemplateForOurJS, {
                loader: 'eslint',
                query: {
                    failOnWarning: true,
                    failOnError: true,
                },
            }),
        ],
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            Object.assign({}, loaderTemplateForOurJS, {
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            }),
        ],
    },
    devServer: {
        contentBase: outPath,
    },
    plugins: plugins,
    debug: !production,
    devtool: production ? false : 'source-map',
    bail: test,
};
