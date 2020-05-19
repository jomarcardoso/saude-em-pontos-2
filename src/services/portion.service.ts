import { Food } from './food.service';

export interface Portion {
  food: Food;
  quantity: number;
  calories: number;
}

export interface PortionData {
  foodId: number;
  quantity: number;
}

function format({
  foods = [],
  portionData,
}: {
  portionData: PortionData;
  foods: Array<Food>;
}): Portion {
  const food = foods[portionData.foodId - 1];

  return {
    food,
    quantity: portionData.quantity,
    calories: food.calories * portionData.quantity,
  };
}

const unFormat = ({ food: { id: foodId }, quantity }) => ({
  foodId,
  quantity,
});

const PortionService = {
  format,
  unFormat,
};

export default PortionService;
