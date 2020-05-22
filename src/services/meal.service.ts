import { Food } from './food.service';
import PortionService, { Portion, PortionData } from './portion.service';

export interface Meal {
  id: number;
  date: Date;
  portions: Array<Portion>;
  calories: number;
  gi: number;
  gc: number;
  carbohydrates: number;
}

export interface MealData {
  date: string;
  portions: Array<PortionData>;
}

export const SHAPE_MEAL_DATA = {
  date: '',
  portions: [],
};

export const SHAPE_MEAL: Meal = {
  calories: 0,
  date: new Date(),
  id: 0,
  portions: [],
  gi: 0,
};

export type SetMeal = (Meal) => void;

function calculateCalories(portions: Array<Portion> = []): number {
  return portions.reduce((sum, portion) => {
    return sum + portion.calories;
  }, 0);
}

function calculategi(portions: Array<Portion> = []): number {
  const sum = portions.reduce((sum, portion) => {
    return sum + portion.gi;
  }, 0);

  return sum / portions.length;
}

function format({
  mealData = SHAPE_MEAL_DATA,
  foods = [],
  index = 0,
}: {
  mealData: MealData;
  foods: Array<Food>;
  index: number;
}): Meal {
  const portions = mealData?.portions?.map((portionData) =>
    PortionService.format({ portionData, foods })
  );

  return {
    ...mealData,
    id: index,
    portions,
    calories: calculateCalories(portions),
    date: mealData?.date ? new Date(mealData?.date) : new Date(),
    gi: calculategi(portions),
  };
}

function unFormat(meal: Meal): MealData {
  return {
    date: meal.date.toString(),
    portions: meal.portions.map(PortionService.unFormat),
  };
}

const MealService = {
  format,
  unFormat,
};

export default MealService;
