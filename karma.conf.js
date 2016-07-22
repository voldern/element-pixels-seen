/* eslint-disable global-require, import/no-extraneous-dependencies */
module.exports = function karmaConf(config) {
    config.set({
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-ievms'),
        ],
        basePath: '',
        frameworks: ['jasmine'],
        files: ['test/**/*.js'],
        preprocessors: {
            'test/**/*.js': ['webpack'],
        },
        webpack: {
            node: {
                fs: 'empty',
            },
            module: {
                preLoaders: [{
                    test: /\.js$/,
                    exclude: /(test|node_modules)/,
                    loader: 'istanbul-instrumenter',
                }],
                loaders: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015'],
                    },
                }],
            },
        },
        webpackMiddleware: {
            noInfo: true,
        },
        coverageReporter: {
            type: 'text',
        },
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'IE8 - WinXP'],
        singleRun: false,
    });
};
