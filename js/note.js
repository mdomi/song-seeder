/**
 * note.js
 * (c) 2015 Michael Dominice
 * note.js is freely distributable under the MIT license.
 */
(function (window, random) {
    'use strict';

    var FLAT = 'b',
        SHARP = '#',
        LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    function times(x, character) {
        var str = '',
            i = 0;
        for (i = 0; i < x; i++) {
            str = str + character;
        }
        return str;
    }

    function getLetterIndex(letter) {
        return LETTERS.indexOf(letter);
    }

    function getLetterName(i) {
        return LETTERS[i % LETTERS.length];
    }

    function getNoteIndex(name) {
        return NOTES.indexOf(name);
    }

    function getNoteName(i) {
        return NOTES[normalizeNoteIndex(i)];
    }

    function normalizeNoteIndex(i) {
        return i % NOTES.length;
    }

    function Note(letter, suffix) {
        if (letter.length !== 1) {
            throw new Error('invalid letter!');
        }
        suffix = suffix || '';

        Object.defineProperty(this, 'letter', {
            get : function () {
                return letter;
            }
        });
        Object.defineProperty(this, 'suffix', {
            get : function () {
                return suffix;
            }
        });
        Object.defineProperty(this, 'name', {
            get : function () {
                return letter + suffix;
            }
        });
        Object.defineProperty(this, 'number', {
            get : function () {
                var base = getNoteIndex(letter);
                if (suffix.charAt(0) === FLAT) {
                    base = base - suffix.length;
                } else if (suffix.charAt(0) === SHARP) {
                    base = base + suffix.length;
                }
                return normalizeNoteIndex(base);
            }
        });
    }

    Note.prototype.hasSharps = function () {
        return this.suffix.indexOf(SHARP) > -1;
    };

    Note.prototype.hasFlats = function () {
        return this.suffix.indexOf(FLAT) > -1;
    };

    Note.prototype.flatten = function () {
        if (this.hasSharps()) {
            return new Note(this.letter, this.suffix.slice(0, this.suffix.length - 1));
        }
        return new Note(this.letter, this.suffix + FLAT);
    };

    Note.prototype.sharpen = function () {
        if (this.hasFlats()) {
            return new Note(this.letter, this.suffix.slice(0, this.suffix.length - 1));
        }
        return new Note(this.letter, this.suffix + SHARP);
    };

    function getDiffSuffix(diff, a, b) {
        var as = times(diff, a),
            bs = times(NOTES.length - 1 - diff, b);
        if (as.length < bs.length) {
            return as;
        } else if (bs.length < as.length) {
            return bs;
        }
        return ;
    }

    Note.prototype.resolveTo = function (letter) {
        var letterNote = Note.create(letter),
            diff = this.number - letterNote.number;
        if (diff > 0) {
            return Note.create(letter, getDiffSuffix(diff, SHARP, FLAT));
        } else if (diff < 0) {
            return Note.create(letter, getDiffSuffix(Math.abs(diff), FLAT, SHARP));
        }
        return letterNote;
    };

    Note.prototype.interval = function (x) {
        var index = this.number + x;
        return Note.parse(getNoteName(index));
    };

    Note.prototype.toJSON = function () {
        return {
            name : this.name
        };
    };

    Note.prototype.toString = function () {
        return this.name;
    };

    Note.create = function (letter, suffix) {
        if (letter.length > 1) {
            return Note.parse(letter);
        }
        return new Note(letter, suffix);
    };

    Note.parse = function (string) {
        var letter = string[0],
            suffix = string.slice(1);
        return Note.create(letter, suffix);
    };

    Note.letters = function (startLetter) {
        var offset = getLetterIndex(startLetter || 'C');
        return LETTERS.map(function (letter, i) {
            return getLetterName(i + offset);
        });
    };

    Note.all = function () {
        return NOTES.map(Note.create);
    };

    Note.random = function () {
        return Note.parse(random.choice(NOTES));
    };

    window.Note = Note;

}(window, window.random));
