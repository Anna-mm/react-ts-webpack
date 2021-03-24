const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const paths = require('./paths');

const config = merge(baseConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
    output: {
        path: paths.buildOutputPath,
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
        publicPath: process.env.PUBLIC_PATH
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin()
    ],
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin()],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    minChunks: 1,
                    name: 'vendor',
                    priority: -10
                },
                default: {
                    test: /[\\/]src[\\/]js[\\/]/,
                    minChunks: 2,
                    name: 'main',
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});

module.exports = config;
