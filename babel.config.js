module.exports = {
    // 声明 babel 可用的插件
    // webpack 在调用 babel-loader 的时候会先调用 plugins 插件来使用
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
}