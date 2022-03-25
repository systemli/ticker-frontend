module.exports = {
    plugins: {
        cssnano: {
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        },
        'postcss-remove-google-fonts': {},
    },
}
