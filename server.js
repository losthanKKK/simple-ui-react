var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    //contentBase: __dirname,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 30,
        poll: true
    },
    stats: {
        colors: true
    },
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/src/util/viewport.js', function(req, res) {
    res.sendFile(path.join(__dirname, 'src', 'util', 'viewport.js'));
});

app.get('/dist/dll.vendor.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'dll.vendor.js'));
});

app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:'+config.port);
});
