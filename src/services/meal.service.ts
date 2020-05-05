interface Portion {
  food: string;
  quantity: number;
}

export interface Meal {
  date: Date;
  portions: Array<Portion>;
}

export interface MealData {
  date: string;
  portions: Array<Portion>;
}

export const SHAPE_MEAL_DATA = {
  date: '',
  portions: [],
};

export type SetMeal = (Meal) => void;

function format(mealData: MealData = SHAPE_MEAL_DATA): Meal {
  return {
    ...mealData,
    date: new Date(mealData.date),
  };
}

const MealService = {
  format,
};

export default MealService;
