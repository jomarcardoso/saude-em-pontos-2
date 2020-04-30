import React from 'react';
import useAccount from './use-account';
import AccountContext from './account-context';

export default function Page({ children }) {
  const [account, setAccount] = useAccount();

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  )
}