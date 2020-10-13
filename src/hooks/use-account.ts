import { useState, useEffect } from 'react';
import AccountService, {
  AccountAndSet,
  SetAccount,
} from '../services/account.service';
import { Food } from '../services/food.service';
import MealService, { Meal, MealData } from '../services/meal.service';

export default function useAccount(foods: Array<Food>): AccountAndSet {
  const [account, _setAccount] = useState(AccountService.get(foods));

  function setMeal(mealData: MealData): number {
    const id = mealData.id || account.meals.length + 1;

    const meal: Meal = MealService.format({
      mealData: {
        ...mealData,
        id,
      },
      foods,
    });

    const editing = mealData.id;
    if (editing) {
      const indexToChange = account.meals.findIndex(
        ({ id: mealIndex }) => mealIndex === id
      );
      account.meals[indexToChange] = meal;

      _setAccount({
        ...account,
        meals: account.meals,
      });

      return id;
    }

    _setAccount({
      ...account,
      meals: [...account.meals, meal],
    });

    return id;
  }

  function setHasReadAdvertise(hasReadAdvertise: boolean): void {
    _setAccount({
      ...account,
      hasReadAdvertise,
    });
  }

  useEffect(() => {
    AccountService.save(account);
  }, [account]);

  const setAccount: SetAccount = {
    // account: _setAccount,
    hasReadAdvertise: setHasReadAdvertise,
    meal: setMeal,
  };

  return {
    account,
    setAccount,
  };
}
