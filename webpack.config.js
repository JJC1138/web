'use strict';

const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

const sourcePath = 'source';

const test = process.env.npm_lifecycle_event === 'test';
const production = test || process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        'home': './' + path.join(sourcePath, 'home.js'),
        'cv': './' + path.join(sourcePath, 'cv.js'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [new ESLintPlugin({ failOnWarning: true })],
    devtool: production ? false : 'source-map',
    bail: test,
    mode: production ? 'production' : 'development',
};
