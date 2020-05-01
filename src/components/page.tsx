import React from 'react';
import useAccount from './use-account';
import AccountContext from './account-context';

const Page: React.SFC = ({ children }) => {
  const { account, setAccount } = useAccount();

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export default Page;
