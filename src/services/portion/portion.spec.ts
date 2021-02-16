import { Measure, SHAPE_MEASURE } from '../food';
import PortionService from './portion.service';

describe('PortionService', () => {
  describe('measureFromString', () => {
    const { measureFromString } = PortionService;

    it('empty', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'UNITY',
      };

      expect(measureFromString()).toStrictEqual(measure);
    });

    it('100g de', () => {
      const measure: Measure = {
        quantity: 100,
        type: 'LITERAL',
      };

      expect(measureFromString('100g de')).toStrictEqual(measure);
    });

    it('100 gramas', () => {
      const measure: Measure = {
        quantity: 100,
        type: 'LITERAL',
      };

      expect(measureFromString('100 gramas')).toStrictEqual(measure);
    });

    it('1 xícara', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'CUP',
      };

      expect(measureFromString('1 xícara')).toStrictEqual(measure);
    });

    it('Uma xícara', () => {
      const measure: Measure = {
        quantity: 1,
        type: 'CUP',
      };

      expect(measureFromString('Uma xícara')).toStrictEqual(measure);
    });

    it('Duas colheres de chá', () => {
      const measure: Measure = {
        quantity: 2,
        type: 'TEA_SPOON',
      };

      expect(measureFromString('Duas colheres de chá')).toStrictEqual(measure);
    });

    it('3 colheres de sopa', () => {
      const measure: Measure = {
        quantity: 3,
        type: 'TABLE_SPOON',
      };

      expect(measureFromString('3 colheres de sopa')).toStrictEqual(measure);
    });
  });
});
