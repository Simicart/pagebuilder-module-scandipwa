module.exports = {
    plugin: {
        overrideDevServerConfig: ({
            devServerConfig,
            context: {
                env,
                paths,
                proxy,
                allowedHost
            }
        }) => {
            console.log('p', devServerConfig);
            // devServerConfig.public = ''
            return devServerConfig;
        }
    }
};
