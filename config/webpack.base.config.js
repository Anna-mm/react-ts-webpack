const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const modifyLessVars = require('./lessConfig');
const env = require('./env');
const paths = require('./paths');

const isEnvProduction = process.env.NODE_ENV === 'production';
const shouldUseSourceMap = true;
const isEnvProductionProfile = false;
const ENV_CSS_LOADER = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
    entry: [paths.appIndexJs],
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                include: paths.appSrc,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            'lodash',
                            '@babel/proposal-class-properties',
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-proposal-nullish-coalescing-operator'
                        ],
                        presets: [
                            '@babel/preset-react',
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'entry'
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                enforce: 'pre',
                use: [
                  {
                    options: {
                      cache: true,
                      formatter: require.resolve('react-dev-utils/eslintFormatter'),
                      eslintPath: require.resolve('eslint'),
                      resolvePluginsRelativeTo: __dirname,

                    },
                    loader: require.resolve('eslint-loader'),
                  },
                ],
                include: paths.appSrc,
              },
            {
                test: /\.(gif|jpg|png|html)\??.*$/,
                use: {
                    loader: 'url-loader?limit=1&name=[path][name].[ext]'
                }
            },
            {
                test: /\.(gif|svg|eot|ttf|svg|woff2?)$/,
                use: 'file-loader?name=images/[name].[hash].[ext]'
            },
            {
                test: /\.less$/,
                use: [
                    ENV_CSS_LOADER,
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: modifyLessVars
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ENV_CSS_LOADER, 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            src: paths.appSrc
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: isEnvProduction,
        minimizer: [
            // This is only used in production mode
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    // Added for profiling in devtools
                    // eslint-disable-next-line
                    keep_classnames: isEnvProductionProfile,

                    // eslint-disable-next-line
                    keep_fnames: isEnvProductionProfile,
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        // eslint-disable-next-line
                        ascii_only: true
                    }
                },
                sourceMap: shouldUseSourceMap
            })
        ]
    },
    plugins: [
        // new webpack.DefinePlugin(env.stringified),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'zh-cn']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[chunkhash:8].css',
            chunkFilename: 'css/[chunkhash:8].css'
        }),
        new webpack.NormalModuleReplacementPlugin(/(.*)\/one-ui(\/?)(?!-)(.*)/, resource => {
            if (resource.context.match(/one-ui-pro|cube-sdk/)) {
                resource.request = resource.request.replace('@baidu/one-ui');
            }
        })
    ]
};
