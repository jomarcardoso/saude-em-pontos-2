import { Food, AminoAcids } from '../food.service';

export interface Portion {
  food: Food;
  quantity: number;
  calories: number;
  carbohydrates: number;
  aminoAcids: AminoAcids;
}

export interface PortionData {
  foodId: number;
  quantity: number;
}

export type UnFormat = (portion: Portion) => PortionData;
