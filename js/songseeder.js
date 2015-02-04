/**
 * songseeder.js
 * (c) 2015 Michael Dominice
 * songseeder.js is freely distributable under the MIT license.
 */
(function (window, Key, Tempo) {
    'use strict';

    function set(el, selector, content) {
        Array.prototype.forEach.call(el.querySelectorAll(selector), (el) => {
            el.innerHTML = content;
        });
    }

    function SongSeeder(el) {

        var self = this;

        Object.defineProperty(this, 'el', {
            get : () => {
                return el;
            }
        });

        this.el.addEventListener('click', function (event) {
            if (event.target.classList.contains('randomizer')) {
                self.randomize();
            }
        }, false);
    }

    SongSeeder.prototype.randomize = function () {
        set(this.el, '.key', Key.random());
        set(this.el, '.tempo', Tempo.random());
    };

    window.SongSeeder = SongSeeder;

}(window, window.Key, window.Tempo));
