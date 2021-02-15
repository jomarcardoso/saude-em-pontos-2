import React, { useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, FieldArray } from 'formik';
import { MealData } from '../services/meal.service';
import SubmitComponent from './submit';
import FoodsContext from '../contexts/foods-context';
import { PortionData } from '../services/portion/portion.types';
import { MeasurerValues } from '../services/food.service';
import AccountContext from '../contexts/account-context';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
});

interface Props {
  mealData: MealData;
  setId: (id: number) => void;
}

interface MealForm {
  portions: Array<PortionData>;
}

const MealRegisterComponent: React.SFC<Props> = ({ mealData, setId }) => {
  const classes = useStyles();
  const foods = useContext(FoodsContext);
  const { setAccount } = useContext(AccountContext);
  let { portions } = mealData;

  if (!portions.length) {
    portions = [
      {
        foodId: 0,
        measure: {
          quantity: 0,
          type: 'NONE',
        },
      },
    ];
  }

  function handleRemove({ index = 0, remove }) {
    remove(index);
  }

  function handleAdd(push) {
    push({
      foodId: 0,
      quantity: 0,
    });
  }

  function handleSubmit({ portions: portionsData }: MealForm): void {
    const id = setAccount.meal({
      portions: portionsData,
      date: mealData?.date
        ? new Date(mealData?.date).toString()
        : new Date().toString(),
      id: mealData?.id ?? 0,
    });

    setId(id);
  }

  return (
    <Formik
      initialValues={{ portions }}
      onSubmit={handleSubmit}
      render={({ values, handleBlur, handleChange }) => (
        <Form action="/" method="post">
          <FieldArray
            name="portions"
            render={({ push, remove }) => (
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {values.portions.map((value, index) => (
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item xs={4}>
                            <FormControl
                              variant="standard"
                              className={classes.formControl}
                            >
                              <InputLabel id={`food-${index}`}>
                                Alimento {index + 1}
                              </InputLabel>
                              <Select
                                name={`portions[${index}].foodId`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.portions[index].foodId}
                              >
                                {foods.map(({ id, name }) => (
                                  <MenuItem value={id}>{name}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              type="number"
                              label={`Quantidade ${index + 1}`}
                              name={`portions[${index}].measure.quantity`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.portions[index].measure.quantity}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <Select
                              name={`portions[${index}].measure.type`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.portions[index].measure.type}
                            >
                              {Object.entries(MeasurerValues).map(
                                ([id, name]) => (
                                  <MenuItem value={id}>{name}</MenuItem>
                                ),
                              )}
                            </Select>
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
                              variant="outlined"
                              color="secondary"
                              aria-label={`remover alimento ${index + 1}`}
                              onClick={() => handleRemove({ index, remove })}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        onClick={() => handleAdd(push)}
                      >
                        Adicionar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <SubmitComponent>Cadastrar refeição</SubmitComponent>
                </Grid>
              </Grid>
            )}
          />
        </Form>
      )}
    />
  );
};

export default MealRegisterComponent;
