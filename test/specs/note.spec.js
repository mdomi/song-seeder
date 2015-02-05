/**
 * note.spec.js
 * (c) 2015 Michael Dominice
 * note.spec.js is freely distributable under the MIT license.
 */
describe('Note', function () {

    var Note = window.Note,
        Interval = window.Interval;

    function testNoteParseNumber(note, number) {
        expect(Note.parse(note).number).toBe(number,
            'Expected ' + note + ' to be parsed with with number ' + number);
    }

    it('generates note numbers', function () {
        testNoteParseNumber('C', 0);
        testNoteParseNumber('C#', 1);
        testNoteParseNumber('Db', 1);
        testNoteParseNumber('D', 2);
        testNoteParseNumber('D#', 3);
        testNoteParseNumber('Eb', 3);
        testNoteParseNumber('E', 4);
        testNoteParseNumber('F', 5);
        testNoteParseNumber('F#', 6);
        testNoteParseNumber('Gb', 6);
        testNoteParseNumber('G', 7);
        testNoteParseNumber('G#', 8);
        testNoteParseNumber('Ab', 8);
        testNoteParseNumber('A', 9);
        testNoteParseNumber('A#', 10);
        testNoteParseNumber('Bb', 10);
        testNoteParseNumber('B', 11);
    });

    function testAddWholeStep(note, start) {
        var end = (start + Interval.WHOLE_STEP) % 12;
        expect(Note.parse(note).interval(Interval.WHOLE_STEP).number).toBe(end,
            'Expected ' + note + ' plus a whole step to have number ' + (end));
    }

    it('enables adding whole steps to notes', function () {
        testAddWholeStep('C', 0);
        testAddWholeStep('C#', 1);
        testAddWholeStep('Db', 1);
        testAddWholeStep('D', 2);
        testAddWholeStep('D#', 3);
        testAddWholeStep('Eb', 3);
        testAddWholeStep('E', 4);
        testAddWholeStep('F', 5);
        testAddWholeStep('F#', 6);
        testAddWholeStep('Gb', 6);
        testAddWholeStep('G', 7);
        testAddWholeStep('G#', 8);
        testAddWholeStep('Ab', 8);
        testAddWholeStep('A', 9);
        testAddWholeStep('A#', 10);
        testAddWholeStep('Bb', 10);
        testAddWholeStep('B', 11);
    });

    function testAddHalfStep(note, start) {
        var end = (start + Interval.HALF_STEP) % 12;
        expect(Note.parse(note).interval(Interval.HALF_STEP).number).toBe(end,
            'Expected ' + note + ' plus a half step to have number ' + (end));
    }

    it('enables adding half steps to notes', function () {
        testAddHalfStep('C', 0);
        testAddHalfStep('C#', 1);
        testAddHalfStep('Db', 1);
        testAddHalfStep('D', 2);
        testAddHalfStep('D#', 3);
        testAddHalfStep('Eb', 3);
        testAddHalfStep('E', 4);
        testAddHalfStep('F', 5);
        testAddHalfStep('F#', 6);
        testAddHalfStep('Gb', 6);
        testAddHalfStep('G', 7);
        testAddHalfStep('G#', 8);
        testAddHalfStep('Ab', 8);
        testAddHalfStep('A', 9);
        testAddHalfStep('A#', 10);
        testAddHalfStep('Bb', 10);
        testAddHalfStep('B', 11);
    });

});
