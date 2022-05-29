const path = require('path');

// __dirname 为webpack.config.js当前路径
module.exports = {
    entry: './bin/core.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'core.js',
    },
    mode: 'development',
    // mode: 'production',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/, // 匹配.js后缀文件
                exclude: /(node_modules|dist)/, // 过滤相关目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env' ],
                    }
                }
            }
        ]
    }

}