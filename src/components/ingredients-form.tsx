/* eslint-disable */
import TextField from '@material-ui/core/TextField';
import React, { FC, useContext } from 'react';
import FoodsContext from '../contexts/foods-context';

const IngredientsForm: FC = () => {
  const foods = useContext(FoodsContext);

  function handleChange({ target: { value = '' } }) {
    const food = foods.find((food) => {
      const lowerFood = food.name.toLowerCase();
      const lowerValue = value.toLowerCase();
      const foodByName = lowerValue.includes(lowerFood);

      if (foodByName) return true;

      return food.keys.find((key) => value.includes(key));
    });

    let measure = 'unity';

    if (
      value.includes('xícara') ||
      value.includes('xicara') ||
      value.includes('copo')
    ) {
      measure = 'cup';
    }

    if (
      value.includes('colher') ||
      value.includes('colheres')
    ) {
      measure = 'tablespoon';
    }

    if (
      value.includes('colher de chá') ||
      value.includes('colheres de chá') ||
      value.includes('colher de cha') ||
      value.includes('colheres de cha') ||
      value.includes('colher pequena') ||
      value.includes('colheres pequenas')
    ) {
      measure = 'teaspoon';
    }

    let partialQuantity = 'full';

    if (value.includes('meio') || value.includes('meia')) partialQuantity = 'half';

    const valueSplit = value.split(' ');

    const quantity = Number(valueSplit.find((statement) => /^\d{1,}$/.test(statement)));

    console.log(quantity, measure, partialQuantity, food);
  }

  return (
    <div>
      <TextField onChange={handleChange} variant="outlined" />
    </div>
  )
}

export default IngredientsForm;