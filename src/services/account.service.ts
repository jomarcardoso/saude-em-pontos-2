export enum CurrentPage {
  HOME,
  MEAL,
  EXERCISE
};

const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

export const SHAPE_ACCOUNT = {
  user: {
    name: '',
    age: 0,
    objectives: []
  },
  meals: []
}

function get() {
  return (typeof window !== 'undefined') && JSON.parse(localStorage.getItem(ACCOUNT_LOCAL_STORAGE));
}

function save(account) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCOUNT_LOCAL_STORAGE, JSON.stringify(account));
  }
}

const AccountService = {
  get,
  save
}

export default AccountService;