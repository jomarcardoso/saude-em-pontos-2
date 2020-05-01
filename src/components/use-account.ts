import { useState, useEffect } from 'react';
import AccountService, {
  Account,
  SetAccount,
} from '../services/account.service';

export default function useAccount(): {
  account: Account;
  setAccount: SetAccount;
} {
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
