/**
 * tempo.js
 * (c) 2015 Michael Dominice
 * tempo.js is freely distributable under the MIT license.
 */
(function (window, random) {
    'use strict';

    // Source: http://hindson.com.au/info/numbers-on-a-standard-metronome/
    var TEMPOS = [
        40,  42,  44,  46,  48,  50,  52,
        54,  56,  58,  60,  63,  66,  69,
        72,  76,  80,  84,  88,  92,  96,
        100, 104, 108, 112, 116, 120, 126,
        132, 138, 144, 152, 160, 168, 176,
        184, 192, 200, 208
    ];

    function Tempo(bpm) {
        Object.defineProperty(this, 'bpm', {
            get : function () {
                return bpm;
            }
        });
    }

    Tempo.prototype.toJSON = function () {
        return {
            bpm : this.bpm
        };
    };

    Tempo.prototype.toString = function () {
        return this.bpm + ' bpm';
    };

    Tempo.random = function () {
        return new Tempo(random.choice(TEMPOS));
    };

    window.Tempo = Tempo;

}(window, window.random));
