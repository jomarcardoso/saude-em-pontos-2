import { Food, AminoAcids, SHAPE_AMINO_ACIDS } from './food.service';
import PortionService, { Portion, PortionData } from './portion.service';

export interface Meal {
  id: number;
  date: Date;
  portions: Array<Portion>;
  calories: number;
  gi: number;
  gl: number;
  carbohydrates: number;
  acidification: number;
  aminoAcids: AminoAcids;
  picture: string;
}

export interface MealData {
  id: number;
  date: string;
  portions: Array<PortionData>;
  picture: string;
}

export const SHAPE_MEAL_DATA: MealData = {
  id: 1,
  date: '',
  portions: [],
  picture: '',
};

export const SHAPE_MEAL: Meal = {
  calories: 0,
  date: new Date(),
  id: 0,
  portions: [],
  gi: 0,
  acidification: 0,
  gl: 0,
  carbohydrates: 0,
  aminoAcids: SHAPE_AMINO_ACIDS,
  picture: '',
};

export type SetMeal = (mealData: MealData) => number;

function calculateCalories(portions: Array<Portion> = []): number {
  return portions.reduce((sum, portion) => {
    return sum + portion.calories;
  }, 0);
}

function calculateCarbohidrates(portions: Array<Portion> = []): number {
  return portions.reduce((sum, portion) => {
    return sum + portion.calories;
  }, 0);
}

function calculateGI(portions: Array<Portion> = []): number {
  const total = portions.reduce((sum, portion) => {
    return sum + portion.food.gi;
  }, 0);

  return total / portions.length;
}

function calculateGC(portions: Array<Portion> = []): number {
  const total = portions.reduce((sum, portion) => {
    return sum + portion.food.gl;
  }, 0);

  return total / portions.length;
}

function calculateAcidification(portions: Array<Portion> = []) {
  const total = portions.reduce((sum, portion) => {
    return sum + portion.food.acidification;
  }, 0);

  return total / portions.length;
}

function format({
  mealData = SHAPE_MEAL_DATA,
  foods = [],
}: {
  mealData: MealData;
  foods: Array<Food>;
}): Meal {
  const portions = mealData?.portions?.map((portionData) =>
    PortionService.format({ portionData, foods })
  );
  const allAminoAcids: AminoAcids = {
    alanine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.alanine + sum,
      0
    ),
    arginine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.arginine + sum,
      0
    ),
    asparticAcid: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.asparticAcid + sum,
      0
    ),
    cystine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.cystine + sum,
      0
    ),
    glutamicAcid: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamicAcid + sum,
      0
    ),
    glutamine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glutamine + sum,
      0
    ),
    glycine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.glycine + sum,
      0
    ),
    histidine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.histidine + sum,
      0
    ),
    isoleucine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.isoleucine + sum,
      0
    ),
    leucine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.leucine + sum,
      0
    ),
    lysine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.lysine + sum,
      0
    ),
    methionine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.methionine + sum,
      0
    ),
    phenylalanine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.phenylalanine + sum,
      0
    ),
    proline: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.proline + sum,
      0
    ),
    serine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.serine + sum,
      0
    ),
    threonine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.threonine + sum,
      0
    ),
    tryptophan: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.tryptophan + sum,
      0
    ),
    tyrosine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.tyrosine + sum,
      0
    ),
    valine: portions.reduce(
      (sum, { aminoAcids }) => aminoAcids.valine + sum,
      0
    ),
  };

  return {
    ...mealData,
    id: mealData.id,
    portions,
    calories: calculateCalories(portions),
    date: mealData?.date ? new Date(mealData?.date) : new Date(),
    gi: calculateGI(portions),
    acidification: calculateAcidification(portions),
    gl: calculateGC(portions),
    carbohydrates: calculateCarbohidrates(portions),
    aminoAcids: allAminoAcids,
  };
}

function unFormat(meal: Meal): MealData {
  return {
    id: meal.id,
    date: meal.date.toString(),
    portions: meal.portions.map(PortionService.unFormat),
    picture: meal.picture,
  };
}

const MealService = {
  format,
  unFormat,
};

export default MealService;
