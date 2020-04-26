const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

function get() {
  return localStorage.getItem(ACCOUNT_LOCAL_STORAGE);
}

const AccountService = {
  get
}

export default AccountService;