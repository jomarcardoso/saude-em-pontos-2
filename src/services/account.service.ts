import MealService, { Meal, SetMeal, MealData } from './meal.service';
import { Food } from './food.service';
import { SetUser, User } from './user.service';

export interface SetAccount {
  user: SetUser;
  meal: SetMeal;
}

export interface Account {
  user: User;
  meals: Array<Meal>;
}

export interface AccountData {
  user: User;
  meals: Array<MealData>;
}

export interface AccountAndSet {
  account: Account;
  setAccount?: SetAccount;
}

const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

export const SHAPE_ACCOUNT: Account = {
  user: {
    name: '',
    age: 0,
    objectives: [],
  },
  meals: [],
};

function format({
  accountData,
  foods,
}: {
  accountData: AccountData;
  foods: Array<Food>;
}): Account {
  return {
    user: accountData?.user ?? SHAPE_ACCOUNT.user,
    meals:
      accountData?.meals?.map((mealData, index) =>
        MealService.format({ mealData, foods, index })
      ) ?? SHAPE_ACCOUNT.meals,
  };
}

function get(foods: Array<Food>): Account {
  if (typeof window === 'undefined') return SHAPE_ACCOUNT;

  const accountData: AccountData =
    JSON.parse(localStorage.getItem(ACCOUNT_LOCAL_STORAGE)) ?? SHAPE_ACCOUNT;

  return format({
    accountData,
    foods,
  });
}

function unFormat(account: Account): AccountData {
  return {
    user: account.user,
    meals: account.meals.map((meal) => MealService.unFormat(meal)),
  };
}

function save(account): void {
  if (typeof window === 'undefined') return;

  const accountData = unFormat(account);
  localStorage.setItem(ACCOUNT_LOCAL_STORAGE, JSON.stringify(accountData));
}

const AccountService = {
  get,
  save,
};

export default AccountService;
