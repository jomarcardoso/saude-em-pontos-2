import { createContext } from 'react';
import { SHAPE_ACCOUNT } from '../services/account.service';

const AccountContext = createContext(SHAPE_ACCOUNT);
export default AccountContext;
