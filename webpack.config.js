var path = require('path');
var webpack = require('webpack');
var js_dist = path.resolve(__dirname, 'build');

module.exports = {
    entry: {
        index: ['webpack-hot-middleware/client', './src/main.js']
    },
    output: {
        path: js_dist,
        filename: '[name].js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("development")
          }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread",
                    "transform-class-properties",
                    "transform-decorators-legacy"]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: /node_modules/
            }
        ]
    }
}
