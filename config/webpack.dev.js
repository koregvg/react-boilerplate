const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const {merge} = require("webpack-merge");
const commonWebpackConfig = require("./webpack.common");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

process.env.NODE_ENV = "development"

module.exports = merge(commonWebpackConfig, {
    target: "web",
    mode: "development",
    module: {
        rules: [{
            oneOf: [
                {
                    test: cssRegex,
                    exclude: cssModuleRegex,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                            }
                        }, 'postcss-loader'],
                },
                {
                    test: lessRegex,
                    exclude: lessModuleRegex,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1 // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                            }
                        }, 'postcss-loader', {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }],
                },
                {
                    test: sassRegex,
                    exclude: sassModuleRegex,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                        }
                    }, 'postcss-loader', 'sass-loader'],
                }
            ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    stats: "errors-only", //只在发生错误或有新的编译时输出
});