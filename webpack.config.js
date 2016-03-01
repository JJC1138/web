'use strict';

const webpack = require('webpack');
const path = require('path');

const sourcePath = 'source';
const outPath = 'site';

const production = process.env.NODE_ENV === 'production';

let plugins = [
    new webpack.ProvidePlugin({ 'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch' })
];

if (production) {
    plugins = plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    ]);
}

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
};
