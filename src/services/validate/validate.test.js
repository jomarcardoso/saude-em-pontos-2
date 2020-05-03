import {
  isNumber,
  isFunction,
  isString,
  isEmptyString,
  isPhone,
  isCep,
  isCpf,
  isDate,
  isDateAbove,
  isDateBelow,
} from '.';

describe('validate', () => {
  describe('isNumber', () => {
    it('method: positive number to equal true', () => {
      expect(isNumber(5)).toBe(true);
    });

    it('method: negative number to equal true', () => {
      expect(isNumber(-5)).toBe(true);
    });

    it('method: number to be "undefined"', () => {
      expect(isNumber(undefined)).toBe(false);
    });

    it('method: number to be "null"', () => {
      expect(isNumber(null)).toBe(false);
    });

    it('method: number to equal text', () => {
      expect(isNumber('text')).toBe(false);
    });

    it('method: number to equal <span>text</span>', () => {
      expect(isNumber('<span>text</span>')).toBe(false);
    });
  });

  describe('isFunction', () => {
    test('method: function to equal "function"', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    test('method: function to equal "object"', () => {
      expect(isFunction({})).toBe(false);
    });

    test('method: function to equal "array"', () => {
      expect(isFunction([])).toBe(false);
    });

    test('method: function to equal "number"', () => {
      expect(isFunction(1)).toBe(false);
    });

    test('method: function to be "undefined"', () => {
      expect(isFunction(undefined)).toBe(false);
    });

    test('method: function to be "null"', () => {
      expect(isFunction(null)).toBe(false);
    });

    test('method: function to equal "text"', () => {
      expect(isFunction('text')).toBe(false);
    });
  });

  describe('isString', () => {
    it('method: string to equal "text"', () => {
      expect(isString('text')).toBe(true);
    });

    it('method: string to equal "object"', () => {
      expect(isString({})).toBe(false);
    });

    it('method: string to equal "array"', () => {
      expect(isString([])).toBe(false);
    });

    it('method: string to equal "number"', () => {
      expect(isString(1)).toBe(false);
    });

    it('method: string to be "undefined"', () => {
      expect(isString(undefined)).toBe(false);
    });

    it('method: string to be "null"', () => {
      expect(isString(null)).toBe(false);
    });
  });

  describe('isEmptyString', () => {
    it('method: string to equal ""', () => {
      expect(isEmptyString('')).toBe(true);
    });

    it('method: string to equal "object"', () => {
      expect(isEmptyString({})).toBe(false);
    });

    it('method: string to equal "array"', () => {
      expect(isEmptyString([])).toBe(false);
    });

    it('method: string to equal "number"', () => {
      expect(isEmptyString(1)).toBe(false);
    });

    it('method: string to be "undefined"', () => {
      expect(isEmptyString(undefined)).toBe(false);
    });

    it('method: string to be "null"', () => {
      expect(isEmptyString(null)).toBe(false);
    });
  });

  describe('isPhone', () => {
    it('("99999999999") to equal true', () => {
      expect(isPhone('99999999999')).toEqual(true);
    });

    it('("9999999999") to equal true', () => {
      expect(isPhone('9999999999')).toEqual(true);
    });

    it('("999999999") to equal false', () => {
      expect(isPhone('999999999')).toEqual(false);
    });

    it('("999999999999") to equal false', () => {
      expect(isPhone('999999999999')).toEqual(false);
    });

    it('("") to equal false', () => {
      expect(isPhone('')).toEqual(false);
    });

    it('() to equal false', () => {
      expect(isPhone()).toEqual(false);
    });
  });

  describe('isCep', () => {
    it('("99999999") to equal true', () => {
      expect(isCep('99999999')).toEqual(true);
    });

    it('("999999999") to equal false', () => {
      expect(isCep('999999999')).toEqual(false);
    });

    it('("9999999") to equal false', () => {
      expect(isCep('9999999')).toEqual(false);
    });

    it('() to equal false', () => {
      expect(isCep()).toEqual(false);
    });
  });

  describe('isCpf', () => {
    it('("01234567890") to equal true', () => {
      expect(isCpf('01234567890')).toEqual(true);
    });

    it('("012345678901") to equal false', () => {
      expect(isCpf('012345678901')).toEqual(false);
    });

    it('("0123456789") to equal false', () => {
      expect(isCpf('0123456789')).toEqual(false);
    });

    it('() to equal false', () => {
      expect(isCpf()).toEqual(false);
    });
  });

  describe('isDate', () => {
    it('("2000-10-10") to equal true', () => {
      expect(isDate('2000-10-10')).toEqual(true);
    });

    it('("2000-20-20") to equal false', () => {
      expect(isDate('2000-20-20')).toEqual(false);
    });

    it('("2000-00-00") to equal false', () => {
      expect(isDate('2000-00-00')).toEqual(false);
    });

    it('("2020-12-31") to equal true', () => {
      expect(isDate('2020-12-31')).toEqual(true);
    });

    it('("2020-31-12") to equal false', () => {
      expect(isDate('2020-31-12')).toEqual(false);
    });

    it('("0000-10-10") to equal true', () => {
      expect(isDate('0000-10-10')).toEqual(true);
    });

    it.skip('("2019-02-30") to equal false', () => {
      expect(isDate('2019-02-30')).toEqual(false);
    });

    it.skip('("2019-04-31") to equal false', () => {
      expect(isDate('2019-04-31')).toEqual(false);
    });

    it('("2019-05-32") to equal false', () => {
      expect(isDate('2019-05-32')).toEqual(false);
    });
  });

  describe('isDateAbove', () => {
    it('("2019-10-10", "2020-10-10") to equal false', () => {
      expect(isDateAbove('2019-10-10', '2020-10-10')).toEqual(false);
    });

    it('("2020-10-10", "2019-10-10") to equal true', () => {
      expect(isDateAbove('2020-10-10', '2019-10-10')).toEqual(true);
    });

    it('("2020-10-10", "2020-10-11") to equal false', () => {
      expect(isDateAbove('2020-10-10', '2020-10-11')).toEqual(false);
    });

    it('("2020-10-11", "2020-10-10") to equal true', () => {
      expect(isDateAbove('2020-10-11', '2020-10-10')).toEqual(true);
    });

    it('("2020-10-10", "2020-10-10") to equal false', () => {
      expect(isDateAbove('2020-10-10', '2020-10-10')).toEqual(false);
    });

    it('("1920-02-02", "2020-10-10") to equal false', () => {
      expect(isDateAbove('1920-02-02', '2020-10-10')).toEqual(false);
    });

    it('("2020-02-02", "1920-10-10") to equal true', () => {
      expect(isDateAbove('2020-02-02', '1920-10-10')).toEqual(true);
    });
  });

  describe('isDateBelow', () => {
    it('("2019-10-10", "2020-10-10") to equal true', () => {
      expect(isDateBelow('2019-10-10', '2020-10-10')).toEqual(true);
    });

    it('("2020-10-10", "2019-10-10") to equal false', () => {
      expect(isDateBelow('2020-10-10', '2019-10-10')).toEqual(false);
    });

    it('("2020-10-10", "2020-10-11") to equal true', () => {
      expect(isDateBelow('2020-10-10', '2020-10-11')).toEqual(true);
    });

    it('("2020-10-11", "2020-10-10") to equal false', () => {
      expect(isDateBelow('2020-10-11', '2020-10-10')).toEqual(false);
    });

    it('("2020-10-10", "2020-10-10") to equal false', () => {
      expect(isDateBelow('2020-10-10', '2020-10-10')).toEqual(false);
    });

    it('("1920-02-02", "2020-10-10") to equal true', () => {
      expect(isDateBelow('1920-02-02', '2020-10-10')).toEqual(true);
    });

    it('("2020-02-02", "1920-10-10") to equal false', () => {
      expect(isDateBelow('2020-02-02', '1920-10-10')).toEqual(false);
    });
  });
});
