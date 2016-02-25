const outpath = 'site';

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
};
