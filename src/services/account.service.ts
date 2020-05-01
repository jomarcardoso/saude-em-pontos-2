import { Meal } from './meal.service';

export enum Ojective {
  HEALTH = 'Saúde',
  MUSCLE = 'Músculatura',
  LOSE_WEIGHT = 'Perder peso',
}

interface User {
  name: string;
  age: number;
  objectives: Array<Ojective>;
}

export type SetUser = (User) => void;

export interface SetAccount {
  user: SetUser;
}

export interface Account {
  user: User;
  meals: Array<Meal>;
}

export interface AccountAndSet {
  account: Account;
  setAccount?: SetAccount;
}

export enum CurrentPage {
  HOME,
  MEAL,
  EXERCISE,
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

function get(): Account {
  if (typeof window === 'undefined') return SHAPE_ACCOUNT;

  const account =
    JSON.parse(localStorage.getItem(ACCOUNT_LOCAL_STORAGE)) ?? SHAPE_ACCOUNT;

  return account;
}

function save(account): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCOUNT_LOCAL_STORAGE, JSON.stringify(account));
}

const AccountService = {
  get,
  save,
};

export default AccountService;
