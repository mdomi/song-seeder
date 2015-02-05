module.exports = function (config) {
    config.set({
        basePath : '../',
        frameworks : ['jasmine'],
        browsers : ['PhantomJS'],
        files : [
            'build/random.js',
            'build/interval.js',
            'build/note.js',
            'build/key.js',
            'build/tempo.js',
            'build/songseeder.js',
            'test/**/*.spec.js'
        ]
    });
};
