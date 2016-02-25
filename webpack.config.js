'use strict';

const webpack = require('webpack');

const outpath = 'site';

const production = process.env.NODE_ENV === 'production';

let plugins = [];

if (production) {
    plugins = plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    ]);
}

module.exports = {
    entry: './source/main.js',
    output: {
        path: outpath,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            }
        ],
    },
    devServer: {
        contentBase: outpath,
    },
    plugins: plugins,
    debug: !production,
    devtool: production ? false : 'eval',
};
