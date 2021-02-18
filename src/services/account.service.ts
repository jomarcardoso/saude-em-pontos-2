import { MealService, Meal, SetMeal, MealData } from './meal';
import { Food } from './food';

export type SetHasReadAdvertise = (hasReadAdvertise: boolean) => void;

export interface SetAccount {
  hasReadAdvertise: SetHasReadAdvertise;
  meal: SetMeal;
}

export interface Account {
  hasReadAdvertise: boolean;
  meals: Array<Meal>;
}

export interface AccountData {
  hasReadAdvertise: boolean;
  meals: Array<MealData>;
}

export interface AccountAndSet {
  account: Account;
  setAccount?: SetAccount;
}

const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

export const SHAPE_ACCOUNT: Account = {
  hasReadAdvertise: false,
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
    hasReadAdvertise:
      accountData.hasReadAdvertise ?? SHAPE_ACCOUNT.hasReadAdvertise,
    meals:
      accountData?.meals?.map((mealData) =>
        MealService.format({ mealData, foods }),
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
    hasReadAdvertise: account.hasReadAdvertise,
    meals: account.meals.map((meal) => MealService.unFormat(meal)),
  };
}

function save(account: Account): void {
  if (typeof window === 'undefined') return;

  const accountData = unFormat(account);

  localStorage.setItem(ACCOUNT_LOCAL_STORAGE, JSON.stringify(accountData));
}

const AccountService = {
  get,
  save,
};

export default AccountService;
