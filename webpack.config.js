var webpack = require('webpack');

module.exports = {
    resolve: {
        root: __dirname + '/src',
        extentions: ['.js', '']
    },

    entry: {
        javascript: __dirname + '/src/app.js'
    },

    output: {
        path: __dirname,
        filename: 'index.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warning: false
            },
            beautify: true,
            mangle: false,
            minimize: false
        })
    ]
}
