import { useState, useEffect } from 'react';
import AccountService from '../services/account.service';

export default function useAccount() {
  const [account, setAccount] = useState(AccountService.get());

  function setUser(user) {
    setAccount({
      ...account,
      user
    });
  }

  useEffect(() => {
    AccountService.save(account);
  }, [account]);

  const set = {
    account: setAccount,
    user: setUser,
  }

  return [
    account,
    set
  ];
}