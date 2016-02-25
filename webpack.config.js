'use strict';

const webpack = require('webpack');
const path = require('path');

const sourcePath = 'source';
const outPath = 'site';

const production = process.env.NODE_ENV === 'production';

let plugins = [];

if (production) {
    plugins = plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    ]);
}

module.exports = {
    entry: './' + path.join(sourcePath, 'main.js'),
    output: {
        path: outPath,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.js$/,
                include: path.join(__dirname, sourcePath),
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            },
        ],
    },
    devServer: {
        contentBase: outPath,
    },
    plugins: plugins,
    debug: !production,
    devtool: production ? false : 'eval',
};
