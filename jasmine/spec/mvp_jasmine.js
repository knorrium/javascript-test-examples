describe('Conversion (model)', function() {
    it('converts decimal numbers into single roman numbers', function() {
      expect(roman.model.toRoman(1)).toEqual('I');
      expect(roman.model.toRoman(2)).toEqual('II');
      expect(roman.model.toRoman(10)).toEqual('X');
      expect(roman.model.toRoman(50)).toEqual('L');
      expect(roman.model.toRoman(100)).toEqual('C');
      expect(roman.model.toRoman(500)).toEqual('D');
      expect(roman.model.toRoman(2000)).toEqual('MM');
    });
    it('converts decimal numbers into combined roman numbers', function() {
      expect(roman.model.toRoman(6)).toEqual('VI');
      expect(roman.model.toRoman(12)).toEqual('XII');
      expect(roman.model.toRoman(2010)).toEqual('MMX');
      expect(roman.model.toRoman(150)).toEqual('CL');
    });
    it('converts numbers after substraction', function() {
      expect(roman.model.toRoman(4)).toEqual('IV');
      expect(roman.model.toRoman(9)).toEqual('IX');
      expect(roman.model.toRoman(900)).toEqual('CM');
    });
    it('and converts strings', function() {
      expect(roman.model.safeToRoman('4')).toEqual('IV');
      expect(roman.model.safeToRoman('9')).toEqual('IX');
      expect(roman.model.safeToRoman('foo')).toEqual('???');
    });
});

describe('Display of roman numerals', function () {
    var display, input, output;

    beforeEach(function() {
        input = $("<input id='input' type='text'/>");
        output = $("<span id='output'>???</span>");
        display = new roman.view.newDisplay(input, output);
    });

    describe('The display', function() {
        it('should be changed when the user enters a value in the field', function() {
            spyOn(display, 'onInput');
            input.val('foo').trigger('keyup');
            expect(display.onInput).toHaveBeenCalledWith('foo');
        });
        it('should display the results', function() {
            display.showResults('bar');
            expect(output.text()).toEqual('bar');
        });
    });
});

describe('Interaction', function () {
    var display;

    beforeEach(function() {
        display = { showResults: function() {} };
        spyOn(display, 'showResults');
        roman.presenter.init(display);
    });

    it('displays the roman version of the number entered by the user', function() {
        display.onInput('42');
        expect(display.showResults).toHaveBeenCalledWith('XLII');
    });

    it('displays question marks when the user enters text', function() {
        display.onInput('foo');
        expect(display.showResults).toHaveBeenCalledWith('???');
    });
});

