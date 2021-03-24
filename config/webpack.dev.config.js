const merge = require('webpack-merge');
const webpack = require('webpack');
const request = require('request');
const webpackDevServerProxy = require('@baidu/webpack-dev-server-proxy');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const proxyConfig = require('./proxyConfig');
const baseConfig = require('./webpack.base.config');
const paths = require('./paths');
// eslint-disable-next-line
const dllManifest = require(paths.dllManifest);
const proxyConfigs = webpackDevServerProxy(proxyConfig);

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js',
        publicPath: '/'
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: paths.htmlTpl
        }),
        new webpack.DllReferencePlugin({
            context: paths.app,
            manifest: dllManifest
        }),
        new AddAssetHtmlPlugin({
            filepath: paths.assetFilePath
        })
    ],
    devServer: {
        ...proxyConfigs,
        historyApiFallback: true,
        port: 3000
    }
});
