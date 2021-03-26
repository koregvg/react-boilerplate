const path = require("path")
const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const os = require("os")
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// 设置 常量
const scriptRegex = /\.(js|jsx|ts|tsx)$/;
const imageInlineSizeLimit = 4 * 1024;

let cacheStatus
if (process.env.npm_config_nocache || process.env.NODE_ENV === "production") {
    cacheStatus = false
} else {
    cacheStatus = {
        type: "filesystem"
    }
}

module.exports = {
    mode: process.env.NODE_ENV,
    entry: paths.appIndexJs,
    output: {
        path: paths.appBuild,
        publicPath: "/"
    },
    cache: cacheStatus,
    devtool: false,
    resolve: {
        modules: [paths.appNodeModules],
        extensions: ['.js', '.jsx', '.css', '.ts', '.tsx'],
        alias: {
            moment$: 'moment/moment.js',
            '@src': paths.appSrc,
            '@public': paths.appPublic,
            '@userConf': paths.appUserConf
        },
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: scriptRegex,
                        use: 'happypack/loader?id=babel',
                        include: path.resolve(__dirname, '../src'),
                        exclude: /node_modules/
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: imageInlineSizeLimit // 4kb
                            }
                        },
                        generator: {
                            filename: paths.appAssestsPath('img/[name].[hash:7][ext]')
                        }
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2?)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: paths.appAssestsPath('font/[name].[hash:7][ext]')
                        }
                    },
                    {
                        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
                        type: 'asset/resource',
                        generator: {
                            filename: paths.appAssestsPath('media/[name].[hash:7][ext]')
                        }
                    }
                ],
            },
        ],
    },
    devServer: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new LodashModuleReplacementPlugin,
        new HappyPack({
            id: "babel",
            loaders: [{
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }],
            threadPool: happyThreadPool
        })
    ],
    stats: "normal"// 打包日志发生错误和新的编译时输出
};
