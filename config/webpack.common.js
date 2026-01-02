/*
 * @Author: '超绝大帅哥' '3425395584@qq.com'
 * @Date: 2026-01-01 19:42:10
 * @LastEditors: '超绝大帅哥' '3425395584@qq.com'
 * @LastEditTime: 2026-01-01 22:18:28
 * @FilePath: \myBolg\config\webpack.common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";



console.log(path.join(import.meta.dirname, "../index.html"));
export default {
  entry: {
    main: path.join(import.meta.dirname, "../src/main.js")
  },
  output: {
    filename: "[name].build.js",
    path: path.join(import.meta.dirname, "../dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "代码纪事",
      template: path.join(import.meta.dirname, "../index.html")
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        rules: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        rules: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              url:false
            }
          },
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                resolveURL: false
              }
            }
          }
        ]
      },
      {
        test: /\.(handlebars|hbs)$/,
        use: [
          "handlebars-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
      }
    ]
  }
}