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
            'C\u266F' : 'D\u266d',
            'D\u266F' : 'E\u266d',
            'G\u266F' : 'A\u266d',
            'A\u266F' : 'B\u266d',
            'A\u266Fm' : 'B\u266d'
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
        Object.defineProperty(this, 'flats', {
            get : function () {
                return getNotes(tonic, quality).reduce(function (count, note) {
                    return count + note.flats;
                }, 0);
            }
        });
        Object.defineProperty(this, 'sharps', {
            get : function () {
                return getNotes(tonic, quality).reduce(function (count, note) {
                    return count + note.sharps;
                }, 0);
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
        return getNotes(this.tonic, this.quality);
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

    function getNotes(tonic, quality) {
        var notes = INTERVALS[quality].reduce(addNextNote, [tonic]);

        return Note.letters(tonic.letter).map(function (letter, i) {
            return notes[i].resolveTo(letter);
        });
    }

    window.Key = Key;

}(window, window.random, window.Note, window.Interval));
