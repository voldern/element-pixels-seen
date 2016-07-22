/* eslint-disable global-require, no-console, import/no-extraneous-dependencies */
const baseConfig = require('./karma.conf.js');

const customLaunchers = {
    slChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
    },
    slFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
    },
    slIE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11',
    },
    slIE10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10.0',
    },
    slIE9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9.0',
    },
    slIE8: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows XP',
        version: '8.0',
    },
};

module.exports = function karmaCiConf(config) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.error('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY ' +
            'environment variables are set.');
        process.exit(1);
    }

    baseConfig(config);

    config.set({
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-sauce-launcher'),
        ],
        sauceLabs: {
            testName: 'element-pixels-visible',
            recordVideo: false,
            recordScreenshots: false,
        },
        reporters: ['dots', 'saucelabs'],
        customLaunchers,
        browsers: Object.keys(customLaunchers),
        singleRun: true,
    });
};
