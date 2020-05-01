import { useState, useEffect } from 'react';
import AccountService from '../services/account.service';

export default function useAccount() {
  const [account, _setAccount] = useState(AccountService.get());

  function setUser(user) {
    _setAccount({
      ...account,
      user,
    });
  }

  useEffect(() => {
    AccountService.save(account);
  }, [account]);

  const setAccount = {
    account: _setAccount,
    user: setUser,
  };

  return {
    account,
    setAccount,
  };
}
