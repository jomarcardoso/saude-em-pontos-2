import { useState, useEffect } from 'react';
import AccountService, { AccountAndSet } from '../services/account.service';
import { Food } from '../services/food.service';
import MealService, { Meal, PortionData } from '../services/meal.service';

export default function useAccount(foods: Array<Food>): AccountAndSet {
  const [account, _setAccount] = useState(AccountService.get(foods));

  function setUser(user): void {
    _setAccount({
      ...account,
      user,
    });
  }

  function setMeal(portionsData: Array<PortionData>): void {
    const meal: Meal = MealService.format({
      mealData: {
        date: '',
        portions: portionsData,
      },
      foods,
    });

    _setAccount({
      ...account,
      meals: [...account.meals, meal],
    });
  }

  useEffect(() => {
    AccountService.save(account);
  }, [account]);

  const setAccount = {
    account: _setAccount,
    user: setUser,
    meal: setMeal,
  };

  return {
    account,
    setAccount,
  };
}
