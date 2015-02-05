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
        KEY_OVERRIDES = {
            'C#' : 'Db',
            'D#' : 'Eb',
            'G#' : 'Ab',
            'A#' : 'Bb',
            'A#m' : 'Bb'
        };

    INTERVALS[MAJOR] = [WHOLE_STEP, WHOLE_STEP, HALF_STEP, WHOLE_STEP, WHOLE_STEP, WHOLE_STEP];
    INTERVALS[MINOR] = [WHOLE_STEP, HALF_STEP, WHOLE_STEP, WHOLE_STEP, HALF_STEP, WHOLE_STEP];

    function Key(tonic, quality) {
        if (!(tonic instanceof Note)) {
            tonic = Note.parse(tonic);
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

    function addNextNote(notes, interval) {
        var lastNote = notes[notes.length - 1],
            nextNote = lastNote.interval(interval);
        notes.push(nextNote);
        return notes;
    }

    Key.prototype.getNotes = function () {
        var notes = INTERVALS[this.quality].reduce(addNextNote, [this.tonic]);

        return Note.letters(this.tonic.letter).map(function (letter, i) {
            return notes[i].resolveTo(letter);
        });
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
        return Key.create(Note.random(), randomQuality()).preferred();
    };

    function randomQuality() {
        return random.randomInt(1) ? MAJOR : MINOR;
    }

    window.Key = Key;

}(window, window.random, window.Note, window.Interval));
