module.exports = {
    webpack: {
        configure: {
            performance: {
                maxEntrypointSize: 512000, // Set your desired limit in bytes
                maxAssetSize: 512000, // Set your desired limit in bytes
            },
        },
    },
};
