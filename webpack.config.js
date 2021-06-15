const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.ts',
    devtool: 'inline-source-map',
    devServer: {
        writeToDisk: true,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    resolve: {
        alias: { app: path.resolve(__dirname, 'src/') },
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
        }],
    },
};
