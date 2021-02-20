import { Food, FOOD } from './food.types';

interface GetFoodByStringArgs {
  text: string;
  foods: Array<Food>;
}

interface GetFoodByStringReturn {
  food: Food;
  index: number;
}

type GetFoodByString = (args: GetFoodByStringArgs) => GetFoodByStringReturn;

export const getFoodByString: GetFoodByString = ({ foods = [], text = '' }) => {
  let index = -1;

  const food =
    foods.find((foodItem) => {
      const lowerFood = foodItem.name.toLowerCase();
      const lowerValue = text.toLowerCase();

      index = lowerValue.indexOf(lowerFood);

      if (index !== -1) return true;

      return foodItem.keys.find((key) => {
        index = text.indexOf(key);

        return index !== -1;
      });
    }) || FOOD;

  return { food, index };
};
