const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

function get() {
  return JSON.parse(localStorage.getItem(ACCOUNT_LOCAL_STORAGE));
}

function save(account) {
  localStorage.setItem(ACCOUNT_LOCAL_STORAGE, JSON.stringify(account));
}

const AccountService = {
  get,
  save
}

export default AccountService;