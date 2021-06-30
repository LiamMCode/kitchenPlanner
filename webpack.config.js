const path = require('path');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'index.tsx'),
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
        extensions: ['*.', '.ts', '.js', '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: 'defaults',
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['css-loader', 'css-modules-typescript-loader'],
            },
        ],
    },
};
