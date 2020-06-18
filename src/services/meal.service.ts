import { Food } from './food.service';
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
}

export interface MealData {
  id: number;
  date: string;
  portions: Array<PortionData>;
}

export const SHAPE_MEAL_DATA: MealData = {
  id: 1,
  date: '',
  portions: [],
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
  const sum = portions.reduce((sum, portion) => {
    return sum + portion.food.gi;
  }, 0);

  return sum / portions.length;
}

function calculateGC(portions: Array<Portion> = []): number {
  const sum = portions.reduce((sum, portion) => {
    return sum + portion.food.gl;
  }, 0);

  return sum / portions.length;
}

function calculateAcidification(portions: Array<Portion> = []) {
  const sum = portions.reduce((sum, portion) => {
    return sum + portion.food.acidification;
  }, 0);

  return sum / portions.length;
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
  };
}

function unFormat(meal: Meal): MealData {
  return {
    id: meal.id,
    date: meal.date.toString(),
    portions: meal.portions.map(PortionService.unFormat),
  };
}

const MealService = {
  format,
  unFormat,
};

export default MealService;
