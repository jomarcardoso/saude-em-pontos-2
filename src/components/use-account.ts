import { useState, useEffect } from 'react';
import AccountService, { AccountAndSet } from '../services/account.service';

export default function useAccount(): AccountAndSet {
  const [account, _setAccount] = useState(AccountService.get());

  function setUser(user): void {
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
