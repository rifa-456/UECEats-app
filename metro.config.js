const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    resolver: {
        resolverMainFields: ['react-native', 'browser', 'main'],
        extraNodeModules: {
            crypto: require.resolve('react-native-crypto'),
            stream: require.resolve('stream-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url'),
            ufo: path.resolve(__dirname, 'shims/ufo'),
        },
        assetExts: [...defaultConfig.resolver.assetExts, 'png', 'jpg', 'jpeg', 'gif', 'webp'],
    },
};