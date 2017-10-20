var path = require('path') //导入模块
var HtmlWebpackPlugin = require('html-webpack-plugin'); //导入文件在内存中生成index.html
module.exports = {
    entry: './src/main.js', //打包的入口文件
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js" //打包出来的文件名称
    },
    module: {
        loaders: [{
                test: /\.vue$/, //参考https://vue-loader.vuejs.org/zh-cn/
                use: [{
                    loader: "vue-loader"
                }]
            },
            {
                test: /\.css$/, //参考:https://doc.webpack-china.org/loaders/style-loader
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(ttf|png|svg|gif)$/, //参考:https://doc.webpack-china.org/loaders/url-loader
                use: [{
                        loader: "url-loader"
                    }

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template.html', //以谁为模板
            filename: 'index.html' //最终在内存里面生成的文件名称
        })
    ]
}