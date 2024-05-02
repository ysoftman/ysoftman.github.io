
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //target: 'node',
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "index.js",
        publicPath: "dist/",
        clean: true
    },
    devServer: {
        open: true,
        port: 8080,
        host: 'localhost',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html',
            chunks: ["page1"]
        }),
        new HtmlWebpackPlugin({
            filename: "navbar.html",
            template: './src/navbar.html',
            chunks: ["page2"]
        }),
        new HtmlWebpackPlugin({
            filename: "programs.html",
            template: './src/programs.html',
            chunks: ["page3"]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(svg|png|jpg|gif)$/i,
                type: 'asset/resource',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "./images/"
                    }
                }
            },
            { 
                test: /\.(eot|ttf|svg)$/,
                type: 'asset/resource',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "./fonts/"
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.md$/i,
                type: 'asset/resource',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }
            },
        ],
    },
    watchOptions: {
        poll: 1000,
    },
};
