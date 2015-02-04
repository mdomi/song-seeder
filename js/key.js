/**
 * key.js
 * (c) 2015 Michael Dominice
 * key.js is freely distributable under the MIT license.
 */
(function (window, random, Note, Interval) {
    'use strict';

    var MAJOR = 'major',
        MINOR = 'minor',
        HALF_STEP = Interval.HALF_STEP,
        WHOLE_STEP = Interval.WHOLE_STEP,
        INTERVALS = {},
        KEYS = Note.all(),
        KEY_OVERRIDES = {
            'C#' : 'Db',
            'D#' : 'Eb',
            'G#' : 'Ab',
            'A#' : 'Bb',
            'A#m' : 'Bbm'
        };

    INTERVALS[MAJOR] = [WHOLE_STEP, WHOLE_STEP, HALF_STEP, WHOLE_STEP, WHOLE_STEP, WHOLE_STEP];
    INTERVALS[MINOR] = [WHOLE_STEP, HALF_STEP, WHOLE_STEP, WHOLE_STEP, HALF_STEP, WHOLE_STEP];

    function Key(tonic, quality) {
        if (!(tonic instanceof Note)) {
            tonic = Note.create(tonic);
        }
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
                var shortName = String(tonic);
                if (quality === MINOR) {
                    shortName = shortName + 'm';
                }
                return shortName;
            }
        });
    }

    Key.prototype.getNotes = function () {
        return INTERVALS[this.quality].reduce(function (notes, interval) {
            notes.push(notes[notes.length - 1].interval(interval));
            return notes;
        }, [this.tonic]);
    };

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
            return new Key(Note.create(KEY_OVERRIDES[this.shortName]), this.quality);
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

}(window, window.random, window.Note, window.Interval));
