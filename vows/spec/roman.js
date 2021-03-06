var vows = require('vows'),
    assert = require('assert'),
    check = function(num, expected) {
        return function(topic) {
            assert.equal(topic.toRoman(num), expected);
        };
    },
    lookup = [
        { num: 100, roman :'C'},
        { num: 90, roman :'XC'},
        { num: 50, roman :'L'},
        { num: 40, roman :'XL'},
        { num: 10, roman :'X'},
        { num: 9, roman :'IX'},
        { num: 5, roman :'V'},
        { num: 4, roman :'IV'},
        { num: 1, roman :'I'},
    ],
    toRoman = function (num) {
        var result = '';
        lookup.forEach(function(comb) {
            while (num >= comb.num) {
                result += comb.roman;
                num -= comb.num;
            }
        });
        return result;
    };

    vows.describe('Converter').addBatch({
        'converts decimal numbers into single roman numbers': {
            topic: { toRoman: toRoman },
            '1 becomes I': check(1, 'I'),
            '2 becomes II': check(2, 'II'),
            '3 becomes III': check(3, 'III'),
            '5 becomes V': check(5, 'V'),
            '10 becomes X': check(10, 'X'),
        },
        'converts decimal numbers into combined roman numbers': {
            topic: { toRoman: toRoman },
            '6 becomes VI': check(6, 'VI'),
            '4 becomes IV': check(4, 'IV'),
            '8 becomes VIII': check(8, 'VIII'),
            '9 becomes IX': check(9, 'IX'),
            '14 becomes XIV': check(14, 'XIV'),
            '23 becomes XXIII': check(23, 'XXIII'),
            '42 becomes XLII': check(42, 'XLII'),
            '99 becomes XCIX': check(99, 'XCIX'),
            '100 becomes C': check(100, 'C'),
        }
}).export(module);

