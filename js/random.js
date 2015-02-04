/**
 * random.js
 * (c) 2015 Michael Dominice
 * random.js is freely distributable under the MIT license.
 */
(function (window) {
    'use strict';

    var random = window.random || {};

    random.randomInt = randomInt;
    random.choice = choice;

    function randomInt(min, max) {
        if (typeof max === 'undefined') {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function choice(array) {
        return array[randomInt(array.length - 1)];
    }

    window.random = random;

}(window));
