module.exports = {
    pwa: {
        themeColor: '#503584',
        msTileColor: '#4B418D',
        iconPaths: {
            msTileImage: 'img/icons/mstile-150x150.png'
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/firebase-messaging-sw.js',
        }
    }
}