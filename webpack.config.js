module.exports = {
    entry: __dirname + '/src/name-manager.jsx',
    output: {
        filename: './site/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
}