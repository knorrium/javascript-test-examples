var toRoman = function(num) {
        var result = '',
            lookup = [
                { dec: 10, roman: 'X'},
                { dec: 9, roman: 'IX'},
                { dec: 5, roman: 'V'},  
                { dec: 4, roman: 'IV'},    
                { dec: 1, roman: 'I'}    
            ];

        lookup.forEach(function(c) {        
            while (num >= c.dec) {
                result += c.roman;
                num -= c.dec;
            }
        }); 
        return result;
    };

$(document).ready(function(){
    test('Converts decimal numbers into single roman numbers', function() {
        expect(3);
        equals(toRoman(1),  'I', '1 becomes I');
        equals(toRoman(5),  'V', '5 becomes V');
        equals(toRoman(10), 'X', '10 becomes X');
    });
    test('Converts decimal numbers into combined roman numbers', function() {
        expect(3);
        equals(toRoman(4),  'IV',  '4 becomes IV');
        equals(toRoman(16), 'XVI', '16 becomes XVI');
        equals(toRoman(9),  'IX',  '9 becomes IX');
    });
});
