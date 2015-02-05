/**
 * main.js
 * (c) 2015 Michael Dominice
 * main.js is freely distributable under the MIT license.
 */
(function (window, document, SongSeeder) {
    'use strict';

    function getCurrentYear() {
        return (new Date()).getFullYear();
    }

    function updateCopyright() {
        var year = getCurrentYear();
        if (year > 2015) {
            document.getElementById('copyright').innerHTML = '&copy; 2015-' + year + ' Mike Dominice';
        }
    }

    function attachFastClick(element) {
        window.FastClick.attach(element);
    }

    function initializeSeeder(element) {
        var seeder = new SongSeeder(element);
        seeder.randomize();
    }

    document.addEventListener('DOMContentLoaded', () => {
        attachFastClick(document.body);
        initializeSeeder(document.getElementById('main'));
        updateCopyright();
    }, false);

}(window, window.document, window.SongSeeder));
