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
                loaders: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: outPath,
    },
    plugins: plugins,
    devtool: production ? false : 'source-map',
    bail: test,
};
