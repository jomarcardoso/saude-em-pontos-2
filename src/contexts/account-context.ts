import { createContext } from 'react';
import { AccountAndSet, SHAPE_ACCOUNT } from '../services/account.service';

const AccountContext = createContext<AccountAndSet>({ account: SHAPE_ACCOUNT });
export default AccountContext;
