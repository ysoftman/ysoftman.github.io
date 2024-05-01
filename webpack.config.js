
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //target: 'node',
    entry: './index.js',
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
            template: './index.html',
            chunks: ["page1"]
        }),
        new HtmlWebpackPlugin({
            filename: "navbar.html",
            template: './navbar.html',
            chunks: ["page2"]
        }),
        new HtmlWebpackPlugin({
            filename: "programs.html",
            template: './programs.html',
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
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: "style-loader"
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: "css-loader"
                    },
                ],
                //exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: "style-loader"
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: "css-loader"
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
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
