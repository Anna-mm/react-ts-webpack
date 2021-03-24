/**
 * @file webpack bundle analyze
 * @author lijia19
 */

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {UnusedFilesWebpackPlugin} = require('unused-files-webpack-plugin');
const merge = require('webpack-merge');
const prodConfig = require('./webpack.pub.config');

const unusedAnalyzeConfig = {
    patterns: ['src/**/*.*'],
    globOptions: {
        ignore: [
            '**/*.md',
            'node_modules/**/*'
        ]
    }
};

module.exports = merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin({analyzerMode: 'static', generateStatsFile: true}),
        new UnusedFilesWebpackPlugin(unusedAnalyzeConfig)
    ]
});
