/**
 * key.js
 * (c) 2015 Michael Dominice
 * key.js is freely distributable under the MIT license.
 */
(function (window, random) {
    'use strict';

    var MAJOR = 'major',
        MINOR = 'minor',
        KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
        KEY_OVERRIDES = {
            'C#' : 'Db',
            'D#' : 'Eb',
            'G#' : 'Ab',
            'A#' : 'Bb',
            'A#m' : 'Bbm'
        };

    function Key(tonic, quality) {
        Object.defineProperty(this, 'tonic', {
            get : function () {
                return tonic;
            }
        });
        Object.defineProperty(this, 'quality', {
            get : function () {
                return quality;
            }
        });
        Object.defineProperty(this, 'name', {
            get : function () {
                return tonic + ' ' + this.quality;
            }
        });
        Object.defineProperty(this, 'shortName', {
            get : function () {
                var shortName = tonic;
                if (quality === MINOR) {
                    shortName = shortName + 'm';
                }
                return shortName;
            }
        });
    }

    Object.defineProperty(Key, 'MINOR', {
        get : function () {
            return MINOR;
        }
    });

    Object.defineProperty(Key, 'MAJOR', {
        get : function () {
            return MAJOR;
        }
    });

    Key.prototype.toJSON = function () {
        return {
            tonic : this.tonic,
            quality : this.quality
        };
    };

    Key.prototype.toString = function () {
        return this.name;
    };

    Key.prototype.preferred = function () {
        if (KEY_OVERRIDES.hasOwnProperty(this.shortName)) {
            return new Key(KEY_OVERRIDES[this.tonic], this.quality);
        }
        return this;
    };

    Key.create = function (tonic, quality) {
        return new Key(tonic, quality);
    };

    Key.random = function () {
        return Key.create(randomKeyName(), randomQuality()).preferred();
    };

    function randomKeyName() {
        return random.choice(KEYS);
    }

    function randomQuality() {
        return random.randomInt(1) ? MAJOR : MINOR;
    }

    window.Key = Key;

}(window, window.random));
