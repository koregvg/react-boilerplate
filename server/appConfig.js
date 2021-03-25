const proxyTable = require("../userConf/proxyTable")

module.exports = {
    deployUrl: "127.0.0.0:8080", // 本地代码推推送到指定服务器
    proxyTable,
    port: 8080, //端口号
    host: "0.0.0.0", //主机号
};