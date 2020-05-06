import { Food } from './food.service';

interface Portion {
  food: Food;
  quantity: number;
}

export interface PortionData {
  foodId: number;
  quantity: number;
}

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
  console.log('antes do format', mealData);

  const oi = {
    ...mealData,
    portions: mealData?.portions?.map((portion) => {
      return {
        food: foods[portion.foodId - 1],
        quantity: portion.quantity,
      };
    }),
    date: mealData?.date ? new Date(mealData?.date) : new Date(),
  };

  console.log('depois do format', oi);

  return oi;
}

function unFormat(meal: Meal): MealData {
  console.log('antes do unformat', meal);

  const oi = {
    date: meal.date.toString(),
    portions: meal.portions.map(({ food: { id: foodId }, quantity }) => ({
      foodId,
      quantity,
    })),
  };

  console.log('depois do unformat', oi);
  return oi;
}

const MealService = {
  format,
  unFormat,
};

export default MealService;
