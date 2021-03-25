const webpack = require("webpack")
const webpackConfig = require("./webpack.prod")
const chalk = require("chalk")

webpack(webpackConfig,(err,stats)=>{
    if (err) throw err
    if(stats.hasErrors()) {
        console.log(chalk.red('Build failed with errors.\n'))
        process.exit(1)
    }
})