var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var nodeModulesPath = path.join(__dirname, 'node_modules');
var port = 3333;
var devConfigExtension = {
    port: port,
    cache: true,
    entry: {
        app: [
            'webpack-hot-middleware/client',
            './test/app.js'
        ],
    },
    resolveLoader: {
        root: nodeModulesPath
    },
    
    resolve: {
        extensions: ['', '.js', '.less','.css'],
        modulesDirectories: ["node_modules"]
    },
    output: {
        filename: '[name].js',
        publicPath: 'http://0.0.0.0:'+port+'/dist/'
    },
    devtool: 'source-map',
    //profile: true,
    module: {
        loaders: [
            {
                test: /\.less$/,
                loaders: ['style', 'css?sourceMap', 'postcss?sourceMap','less?sourceMap'],
                //loader: ExtractTextPlugin.extract("css?sourceMap!postcss?sourceMap!less?sourceMap"),
                include: path.join(__dirname, "src")
            },
            { test: /\.(jpg|png|jpg|png|woff|woff2|eot|ttf|svg|gif)$/, loader: "url?limit=10000" },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel', 'eslint'],
            }
        ]
    },
    postcss: function () {
        return [require('postcss-flexboxfixer'), require('autoprefixer')];
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./dist/vendor-manifest.json")
        }),
        new ExtractTextPlugin("[name].css", {
            allChunks: true,
            disable: false
        }),
        // Used for hot-reload
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = devConfigExtension;
