import { Food, AminoAcids, Measure } from '../food';

export interface Portion {
  food: Food;
  quantity: number;
  calories: number;
  carbohydrates: number;
  aminoAcids: AminoAcids;
  measure: Measure;
}

export interface PortionData {
  foodId: number;
  measure: Measure;
}

export type UnFormat = (portion: Portion) => PortionData;
