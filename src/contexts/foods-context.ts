import { createContext } from 'react';
import { Food } from '../services/food.service';

const FoodsContext = createContext<Array<Food>>([]);

export default FoodsContext;
