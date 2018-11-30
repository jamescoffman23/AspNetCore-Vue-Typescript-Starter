const webpack              = require("webpack"); //to access built-in plugins
const path                 = require("path");
const CleanWebpackPlugin   = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin       = require("webpack-manifest-plugin");
//const VueLoaderPlugin      = require("vue-loader/lib/plugin");

const manifestOptions = {
    fileName: "app.manifest.json",
    // publicPath: "/",
    //  basePath: "/"
};

module.exports = {
    mode: "development",
    entry: {
        app: "./ClientApp/main.ts",
        vendor: [
           // "material-design-icons-iconfont/dist/material-design-icons.css",
            "vuetify/dist/vuetify.css",
            "spinkit/css/spinners/3-wave.css"
        ]
    },
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "./wwwroot/dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"] },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ["file-loader"]  },
            { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ } //options: { appendTsSuffixTo: [/\.vue$/] }
//            { test: /\.vue$/, use: "vue-loader", options: { esModule: true } }
        ]
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm.js"
        },
        extensions: [".tsx", ".ts", ".vue", ".js"]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, "./wwwroot/dist")]),
        new ManifestPlugin(manifestOptions),
        new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" }),
        //new VueLoaderPlugin()
    ]
};