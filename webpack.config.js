module.exports = {
    entry: './site/main.js',
    output: {
        path: './site',
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
        contentBase: 'site',
    },
};
