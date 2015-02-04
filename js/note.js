/**
 * note.js
 * (c) 2015 Michael Dominice
 * note.js is freely distributable under the MIT license.
 */
(function (window) {
    'use strict';

    var NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    function getIndex(name) {
        return NOTES.indexOf(name);
    }

    function getName(i) {
        return NOTES[i % NOTES.length];
    }

    function Note(name) {
        Object.defineProperty(this, 'name', {
            get : function () {
                return name;
            }
        });
    }

    Note.prototype.hasSharps = function () {
        return this.name.indexOf('#') > 0;
    };

    Note.prototype.hasFlats = function () {
        return this.name.indexOf('b') > 0;
    };

    Note.prototype.flatten = function () {
        if (this.hasSharps()) {
            return new Note(this.name.slice(0, this.name.length - 1));
        }
        return new Note(this.name + 'b');
    };

    Note.prototype.sharpen = function () {
        if (this.hasFlats()) {
            return new Note(this.name.slice(0, this.name.length - 1));
        }
        return new Note(this.name + '#');
    };

    Note.prototype.interval = function (x) {
        var index = getIndex(this.name) + x;
        return new Note(getName(index));
    };

    Note.prototype.toJSON = function () {
        return {
            name : this.name
        };
    };

    Note.prototype.toString = function () {
        return this.name;
    };

    Note.create = function (name) {
        return new Note(name);
    };

    Note.all = function () {
        return NOTES.map(Note.create);
    };

    window.Note = Note;

}(window));
