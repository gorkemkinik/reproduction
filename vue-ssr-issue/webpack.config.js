const path = require("path");
const webpack = require('webpack');
const merge = require("webpack-merge");
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = {
    mode: "development",
    optimization: {
        minimize: true
    },
    context: path.resolve(__dirname, "src"),
    resolve: {
        extensions: [".js", ".json", ".vue", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    preserveWhitespace: false,
                    extractCSS: true
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"],
                        plugins: ["transform-object-rest-spread", "syntax-dynamic-import"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader',
                options: {
                    svgo: {
                        plugins: [
                            {removeDoctype: true},
                            {removeComments: true}
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    }
};

const server = {
    target: 'node',
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2'
    },
    entry: {
        server:"./entry-server.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': "server"
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(path.resolve(__dirname, "dist")),
        new VueSSRServerPlugin()
    ],
    externals: nodeExternals({
        whitelist: /\.css$/
    }),


};

const client = {
    entry: {
        client: "./entry-client.js"
    },
    output: {
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            name: "manifest",
            minChunks: Infinity
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': "client"
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"src/index.html")
        }),
        new VueSSRClientPlugin()
    ]
};

module.exports = (env, args) => {
    let serverConfig = merge(common, server);
    let clientConfig = merge(common, client);
    return [serverConfig, clientConfig];
};

