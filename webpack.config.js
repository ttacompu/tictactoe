const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');


module.exports = function (env) {
    let config = {
        context: path.resolve(__dirname, './src'),
        entry : {
            app : './app.js'
        },
        output : {
            filename : '[name].bundle.js',
            path : path.resolve(__dirname, './dist'),
            publicPath : '/'
        },
        devtool : 'inline-source-map',
        resolve : {
            extensions : ['.js', '.css']
        },
        module : {
            rules : [
                {
                    test : /\.css$/,
                    use : ['style-loader', 'css-loader']
                },

                {
                    test : /\.js$/,
                    exclude : /node_modules/,
                    use : {
                        loader : 'babel-loader',
                        options : {
                            presets : ['env']
                        }
                    }
                }
            ]
        },
        plugins : [
            new HtmlwebpackPlugin({
                template : 'index.html',
                inject : true
            })
        ]
    }

    return config;

}