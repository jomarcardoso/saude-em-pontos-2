/* eslint-disable */
import TextField from '@material-ui/core/TextField';
import React, { FC, useContext } from 'react';
import FoodsContext from '../contexts/foods-context';
import PortionService from '../services/portion/portion.service';

const IngredientsForm: FC = () => {
  const foods = useContext(FoodsContext);

  function handleChange({ target: { value = '' } }) {
    const portion = PortionService.portionDataFromString({
      text: value,
      foods,
    });

    console.log(portion);
  }

  return (
    <div>
      <TextField onChange={handleChange} variant="outlined" />
    </div>
  )
}

export default IngredientsForm;