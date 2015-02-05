/**
 * key.spec.js
 * (c) 2015 Michael Dominice
 * key.spec.js is freely distributable under the MIT license.
 */
describe('Key', function () {

    var Note = window.Note,
        Key = window.Key;

    function consolizeNote(string) {
        return string.replace(new RegExp(Note.FLAT, 'g'), 'b')
            .replace(new RegExp(Note.SHARP, 'g'), '#');
    }

    function testKey(keyName, quality, scale, message) {
        var key = Key.create(Note.create(keyName), quality);
        expect(consolizeNote(key.getNotes().join(' '))).toBe(scale, message);
    }

    function testMajorKey(keyName, scale) {
        testKey(keyName, Key.MAJOR, scale,
            'Expected ' + keyName + ' to generate a major scale with notes ' + scale);
    }

    function testMinorKey(keyName, scale) {
        testKey(keyName, Key.MINOR, scale,
            'Expected ' + keyName + ' to generate a minor scale with notes ' + scale);
    }

    it('builds notes in major scales', function () {
        testMajorKey('C', 'C D E F G A B');
        testMajorKey('G', 'G A B C D E F#');
        testMajorKey('D', 'D E F# G A B C#');
        testMajorKey('A', 'A B C# D E F# G#');
        testMajorKey('E', 'E F# G# A B C# D#');
        testMajorKey('B', 'B C# D# E F# G# A#');
        testMajorKey('F#', 'F# G# A# B C# D# E#');
        testMajorKey('Db', 'Db Eb F Gb Ab Bb C');
        testMajorKey('Ab', 'Ab Bb C Db Eb F G');
        testMajorKey('Eb', 'Eb F G Ab Bb C D');
        testMajorKey('Bb', 'Bb C D Eb F G A');
        testMajorKey('F', 'F G A Bb C D E');
    });

    it('builds nots in minor scales', function () {
        testMinorKey('A', 'A B C D E F G');
        testMinorKey('E', 'E F# G A B C D');
        testMinorKey('B', 'B C# D E F# G A');
        testMinorKey('F#', 'F# G# A B C# D E');
        testMinorKey('C#', 'C# D# E F# G# A B');
        testMinorKey('G#', 'G# A# B C# D# E F#');
        testMinorKey('Bb', 'Bb C Db Eb F Gb Ab');
        testMinorKey('F', 'F G Ab Bb C Db Eb');
        testMinorKey('C', 'C D Eb F G Ab Bb');
        testMinorKey('G', 'G A Bb C D Eb F');
        testMinorKey('D', 'D E F G A Bb C');
    });

    function testSharpCount(keyName, count) {
        var key = Key.create(Note.create(keyName), Key.MAJOR);
        expect(key.sharps).toBe(count, 'Expected ' + keyName + ' to have ' + count + ' sharps');
    }

    it('reports correct number of sharps', function () {
        testSharpCount('C', 0);
        testSharpCount('G', 1);
        testSharpCount('D', 2);
        testSharpCount('A', 3);
        testSharpCount('E', 4);
        testSharpCount('B', 5);
        testSharpCount('F#', 6);
        testSharpCount('Db', 0);
        testSharpCount('Ab', 0);
        testSharpCount('Eb', 0);
        testSharpCount('Bb', 0);
        testSharpCount('F', 0);
    });

    function testFlatCount(keyName, count) {
        var key = Key.create(Note.create(keyName), Key.MAJOR);
        expect(key.flats).toBe(count, 'Expected ' + keyName + ' to have ' + count + ' flats');
    }

    it('reports correct number of sharps', function () {
        testFlatCount('C', 0);
        testFlatCount('G', 0);
        testFlatCount('D', 0);
        testFlatCount('A', 0);
        testFlatCount('E', 0);
        testFlatCount('B', 0);
        testFlatCount('F#', 0);
        testFlatCount('Db', 5);
        testFlatCount('Ab', 4);
        testFlatCount('Eb', 3);
        testFlatCount('Bb', 2);
        testFlatCount('F', 1);
    });

});
