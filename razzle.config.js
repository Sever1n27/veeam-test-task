const path = require('path');

module.exports = {
    plugins: [
        {
            name: 'typescript',
            options: {
                useBabel: true,
                useEslint: true,
                forkTsChecker: {
                    typescript: {
                        configFile: './tsconfig.json',
                    },
                    eslint: {
                        files: ['*.js', '*.ts', '*.tsx'],
                    },
                },
            },
        },
        'scss',
    ],
    options: {
        verbose: true,
        buildType: 'spa',
    },
    modifyWebpackConfig: (config) => {
        const customConfig = { ...config.webpackConfig };
        customConfig.resolve['alias'] = {
            '@ui': path.resolve('./src/shared/ui/'),
            '@pages': path.resolve('./src/pages/'),
            '@types': path.resolve('./src/types/'),
            '@features': path.resolve('./src/features/'),
            '@widgets': path.resolve('./src/widgets/'),
            '@lib': path.resolve('./src/shared/lib/'),
            '@entities': path.resolve('./src/entities/'),
        };
        return customConfig;
    },
};
