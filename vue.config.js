module.exports = {
    devServer: {
        proxy: {
            '/Ven1': {
                target: 'https://localhost:7162',
                changeOrigin: true,
                secure: false,
            },
        },
    },
};