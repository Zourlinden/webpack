const path = require('path')

// 1、导入html-webpack-plugin这个插件，得到插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2、new 构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
    // 指定要复制哪个页面
    template: './src/index.html',
    // 指定复制出来的文件名和存放路径
    filename: './index.html'
});
// 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 使用node.js中的导出语法，向外导出一个webpack的配置对象
module.exports = {
    // 在开发调试阶段，建议把devtool的值设置为eval-source-map
    // devtool: 'eval-source-map',
    // 在实际开发的时候，建议大家把devtool的值设置为 nosources-source-map 或直接关闭SourceMap
    devtool: 'nosources-source-map',
    // 代表webpack运行的模式，可选值有两个development 和 production
    // 结论：开发的时候一定要用development，因为追求的是打包的速度，而不是体积；
    // 反过来，发布线上的时候一定要用production，因为上线追求的是体积小，而不是打包速度。
    mode: 'development',
    // entry: '指定要处理哪个文件'
    entry: path.join(__dirname, './src/index1.js'),
    // output: '指定生成的文件要存放到哪里'
    output: {
        // 存放到目录
        path: path.join(__dirname, './dist'),
        // 生成的文件名
        filename: 'js/bundle.js'
    },
    // 插件对的数组，将来webpack在运行时，会加载并调用这些插件
    plugins: [htmlPlugin, new CleanWebpackPlugin()],
    devServer:{
        // 首次打包成功后自动打开浏览器
        open: true,
        // 指定运行的地址
        host: '127.0.0.1',
        // 在http协议中，如果端口号是80，则可以被省略
        port: 80
    },
    module: {
        rules: [
            // 定义了不同模块对应的loader
            {test: /\.css$/,use: ['style-loader', 'css-loader']},
            // 处理.less文件的loader
            {test: /\.less$/,use: ['style-loader', 'css-loader','less-loader']},
            // 处理图片文件的loader
            // 如果需要调用的loader只有一个，则只传递一个字符串也行，如果有多个loader，则必须指定数组
            // 在配置url-loader的时候，多个参数之间，使用&符号进行分隔
            {test: /\.jpg|png|gif|jpeg$/,use: 'url-loader?limit=22229&outputPath=images'},
            // 使用babel—loader处理高级的js语法
            // 在配置babel-loader的时候，只需要把自己的代码进行转化即可；
            // 一定要排除 node_modules 目录中的JS文件
            // 因为第三方包中的 JS 兼容性，不需要程序员关心
            {test: /\.js$/,use: 'babel-loader', exclude: /node_modules/}
        ]
    },
    resolve: {
        alias: {
            // 告诉webpack，程序员写的代码中，@符号表示src这一层目录
            '@': path.join(__dirname, './src/')
        }
    }
}