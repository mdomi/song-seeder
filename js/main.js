/**
 * main.js
 * (c) 2015 Michael Dominice
 * main.js is freely distributable under the MIT license.
 */
(function (window, document) {
    'use strict';

    var KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        KEY_OVERRIDES = {
            'C#' : 'Db',
            'D#' : 'Eb',
            'G#' : 'Ab',
            'A#' : 'Bb',
            'A#m' : 'Bbm'
        },
        // Source: http://hindson.com.au/info/numbers-on-a-standard-metronome/
        TEMPOS = [
            40,  42,  44,  46,  48,  50,  52,
            54,  56,  58,  60,  63,  66,  69,
            72,  76,  80,  84,  88,  92,  96,
            100, 104, 108, 112, 116, 120, 126,
            132, 138, 144, 152, 160, 168, 176,
            184, 192, 200, 208
        ];

    function randomTempo() {
        return TEMPOS[randomInt(TEMPOS.length - 1)];
    }

    function randomInt(min, max) {
        if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function randomKey() {
        var key = KEYS[randomInt(KEYS.length - 1)] + (randomInt(1) ? 'm' : '');
        if (KEY_OVERRIDES.hasOwnProperty(key)) {
            return KEY_OVERRIDES[key];
        }
        return key;
    }

    function each(elements, func) {
        return Array.prototype.forEach.call(elements, func);
    }

    function SongSeeder(el) {

        this.randomize = randomize;

        function randomize() {
            var key = randomKey(),
                tempo = randomTempo();
            each(el.querySelectorAll('.key'), function (target) {
                target.innerHTML = key;
            });
            each(el.querySelectorAll('.tempo'), function (target) {
                target.innerHTML = tempo + ' bpm';
            });
        }

        each(el.querySelectorAll('.randomizer'), function (randomizer) {
            randomizer.addEventListener('click', function () {
                randomize();
                randomizer.blur();
            });
        });
    }

    function updateCopyright() {
        var year = (new Date()).getFullYear();
        if (year > 2015) {
            document.getElementById('copyright').innerHTML = '&copy; 2015-' + year + ' Mike Dominice';
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        window.FastClick.attach(document.body);
        var seeder = new SongSeeder(document.getElementById('main'));
        seeder.randomize();
        updateCopyright();
    }, false);

}(this, this.document));
