const devMode = process.env.NODE_ENV === "development"

const presets = [
    [
        "@babel/env",
        {
            "useBuiltIns": "usage",
            "modules": false,
            "corejs": {
                "version": 3,
                "proposals": true
            }
        }
    ],
    "@babel/react",
    "@babel/typescript"
]

const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    ["import", {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
    }]
]

if (devMode) {
    plugins.push(require.resolve("react-refresh/babel"))
}

module.exports = {
    presets,
    plugins
}