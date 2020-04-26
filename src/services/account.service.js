const ACCOUNT_LOCAL_STORAGE = 'saude-em-pontos';

function isCreated() {
  return localStorage[ACCOUNT_LOCAL_STORAGE];
}

const AccountService = {
  isCreated
}

export default AccountService;