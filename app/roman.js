/*global jQuery */ 

var roman = {};

roman.model = (function () {
    var lookup = [
        { dec: 1000, roman: 'M'},
        { dec: 900, roman:  'CM'},
        { dec: 500, roman:  'D'},
        { dec: 400, roman:  'CD'},
        { dec: 100, roman:  'C'},
        { dec: 90, roman:   'XC'},
        { dec: 50, roman:   'L'},
        { dec: 40, roman:   'XL'},
        { dec: 10, roman:   'X'},
        { dec: 9, roman:    'IX'},
        { dec: 5, roman:    'V'},
        { dec: 4, roman:    'IV'},
        { dec: 1, roman:    'I'}
    ];

    return {
        toRoman: function (num) {
            var result = '';

            lookup.forEach(function (c) {
                while (num >= c.dec) {
                    result += c.roman;
                    num -= c.dec;
                }
            });
            return result;
        },
        safeToRoman: function (input) {
            var num = parseInt(input, 10);
            return isNaN(num) ? '???' : this.toRoman(num);
        }
    };
}());

roman.view = (function (jQuery) {
    var Display = function (inputField, outputField) {
        this.inputField = inputField;
        this.outputField = outputField;
        var display = this;

        inputField.keyup(function () {
            display.onInput(display.inputField.val()); 
        });
    }; 
    Display.prototype.showResults = function (result) {
        this.outputField.text(result);
    };
    Display.prototype.onInput = function () {};

    return {
        newDisplay: function (inputField, outputField) {
            return new Display(inputField, outputField);
        }
    };
}(jQuery));

roman.presenter = (function (model, view) {
    return {
        init: function (display) {
            display.onInput = function (input) {
                display.showResults(model.safeToRoman(input));
            };            
        },
        start: function (inputField, outputField) {
            this.init(view.newDisplay(inputField, outputField));
        }
    };
}(roman.model, roman.view));

