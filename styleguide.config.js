const path = require('path');

module.exports = {
    title: 'Vitta Styleguid',
    components: 'src/components/**/[A-Z]*.vue',
    navigation: true,
    // Override Styleguidist components
    styleguideComponents: {
        LogoRenderer: path.join(__dirname, 'layout/components/Logo')
    },
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['react', 'env'],
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.png$/,
                    use: ['url-loader'],
                },
            ],
        },
    },
    showUsage: true,
    showCode: true,
};
