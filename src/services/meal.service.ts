import { Food } from './food.service';
import PortionService, { Portion, PortionData } from './portion.service';

export interface Meal {
  date: Date;
  portions: Array<Portion>;
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

function format({
  mealData = SHAPE_MEAL_DATA,
  foods = [],
}: {
  mealData: MealData;
  foods: Array<Food>;
}): Meal {
  return {
    ...mealData,
    portions: mealData?.portions?.map((portionData) =>
      PortionService.format({ portionData, foods })
    ),
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
