import { Food, AminoAcids, Measure, SHAPE_AMINO_ACIDS } from '../food';
import { SHAPE_FOOD } from '../food/food.types';

export interface Portion {
  food: Food;
  quantity: number;
  calories: number;
  carbohydrates: number;
  aminoAcids: AminoAcids;
  measure: Measure;
  description: string;
}

export type UnFormat = (portion: Portion) => string;

export const SHAPE_PORTION: Portion = {
  aminoAcids: SHAPE_AMINO_ACIDS,
  calories: 0,
  carbohydrates: 0,
  food: SHAPE_FOOD,
  measure: {
    quantity: 0,
    type: 'LITERAL',
  },
  quantity: 0,
  description: '',
};
