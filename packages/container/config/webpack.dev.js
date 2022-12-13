const {merge}  = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: "http://localhost:9090/"
    },
    devServer : {
        port: 9090,
        historyApiFallback : {
            index: '/index.html'
        }
    },
    plugins : [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js'
            },
            // shared:['react','rect-dom'],
            shared: packageJson.dependencies,
        }),

    ],
}

module.exports = merge(commonConfig, devConfig);
