import { Food } from './food.service';
import PortionService, { Portion, PortionData } from './portion.service';

export interface Meal {
  date: Date;
  portions: Array<Portion>;
  calories: number;
}

export interface MealData {
  date: string;
  portions: Array<PortionData>;
}

export const SHAPE_MEAL_DATA = {
  date: '',
  portions: [],
};

export type SetMeal = (Meal) => void;

function calculateCalories(portions: Array<Portion> = []): number {
  return portions.reduce((sum, portion) => {
    return sum + portion.calories;
  }, 0);
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
    portions,
    calories: calculateCalories(portions),
    date: mealData?.date ? new Date(mealData?.date) : new Date(),
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
