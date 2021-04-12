const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "source-map",

    devServer: {
        hot: true,
        open: true,
        inline: true,
        proxy: {
            "/api": "http://localhost:3000"
        }
    },

    entry: "./javascripts/phonebook.js",

    output: {
        filename: "phonebook.js",
        path: path.resolve(__dirname, "..", "public")
    },

    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2|ico)$/,
                use: [
                    {
                        loader: "file-loader?name=[path][name].[ext]",
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: "style.css"
        }),

        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ]
}