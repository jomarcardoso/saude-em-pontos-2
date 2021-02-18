import { AminoAcids, SHAPE_AMINO_ACIDS } from '../food';
import { Portion } from '../portion/portion.types';

export interface Meal {
  id: number;
  name: string;
  description: string;
  image: string;
  portions: Array<Portion>;
  calories: number;
  gi: number;
  gl: number;
  carbohydrates: number;
  acidification: number;
  aminoAcids: AminoAcids;
}

export interface MealData {
  id: number;
  name: string;
  description?: string;
  portions: Array<string>;
}

export const SHAPE_MEAL_DATA: MealData = {
  id: 1,
  name: '',
  description: '',
  portions: [],
};

export const SHAPE_MEAL: Meal = {
  calories: 0,
  description: '',
  image: '',
  name: '',
  id: 0,
  portions: [],
  gi: 0,
  acidification: 0,
  gl: 0,
  carbohydrates: 0,
  aminoAcids: SHAPE_AMINO_ACIDS,
};

export type SetMeal = (mealData: MealData) => number;
