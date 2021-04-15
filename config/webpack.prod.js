const paths = require("./paths")
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); //打包前清空build目录文件
const ProgressBarPlugin = require("progress-bar-webpack-plugin"); // 打包进度条美化
const chalk = require("chalk");
const commonWebpackConfig = require("./webpack.common");
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

process.env.NODE_ENV = "production"

let productionWebpackConfig = merge(commonWebpackConfig(), {
    target: "browserslist",
    mode: "production",
    output: {
        publicPath: '',
        path: paths.appBuild,
        filename: paths.appAssestsPath('js/[name].[chunkhash].js'),
        crossOriginLoading: 'anonymous',
        chunkFilename: paths.appAssestsPath('js/[id].[chunkhash].js')
    },
    devtool: "source-map",
    module: {
        rules: [{
            oneOf: [
                {
                    test: cssRegex,
                    exclude: cssModuleRegex,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
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
                    use: [{
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
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
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
    plugins: smp.wrap([
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: paths.appAssestsPath('css/[name].[contenthash].css')
        }),
        new ProgressBarPlugin({
            format:
                `${chalk.green.bold("build[:bar]")} ` +
                chalk.green.bold(":percent") +
                " (:elapsed seconds)",
            clear: false,
            width: 60,
        }),
    ]),
    optimization: {
        minimizer: [
            new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true
                        },
                        format: {
                            comments: false,
                        }
                    },
                    parallel: true,
                    extractComments: false
                },
                new OptimizeCssAssetsPlugin({
                    assetNameRegExp: /\.optimize\.css$/g,
                    cssProcessor: require('cssnano'),
                    cssProcessorOptions: {safe: true, discardComments: {removeAll: true}},
                    canPrint: true
                }))
        ],
    },
    stats: "verbose" //标准输出
});
if (process.env.npm_config_report) {
    const bundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
    productionWebpackConfig.plugins.push(new bundleAnalyzer({
        analyzerHost: "0.0.0.0",
        analyzerPort: 11888
    }))
    console.log(chalk.yellow("bundleAnalyzer is runing on 11888"))
}

module.exports = productionWebpackConfig