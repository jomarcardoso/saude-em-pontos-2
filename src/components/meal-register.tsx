import React, { FC, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, FieldArray, ArrayHelpers } from 'formik';
import { MealData } from '../services/meal.service';
import SubmitComponent from './submit';
import AccountContext from '../contexts/account-context';
import PortionService from '../services/portion/portion.service';
import FoodsContext from '../contexts/foods-context';

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
  portions: Array<string>;
}

const MealRegister: FC<Props> = ({ mealData, setId }) => {
  const classes = useStyles();
  const { setAccount } = useContext(AccountContext);
  const foods = useContext(FoodsContext);
  let { portions = [''] } = mealData;

  if (!portions.length) {
    portions = [''];
  }

  function handleRemove({
    index = 0,
    remove,
  }: Partial<ArrayHelpers> & { index: number }) {
    remove(index);
  }

  function handleAdd({ push }: Partial<ArrayHelpers>) {
    push({
      foodId: 0,
      quantity: 0,
    });
  }

  function handleBlur({ target: { value = '' } }) {
    const portion = PortionService.portionFromString({
      text: value,
      foods,
    });

    console.log(portion);
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
      render={({ values, handleBlur: formikHandleBlur, handleChange }) => (
        <Form action="/" method="post">
          <FieldArray name="portions">
            {({ push, remove }: ArrayHelpers) => (
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {values.portions.map((value, index) => (
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item xs={10}>
                            <FormControl
                              variant="standard"
                              className={classes.formControl}
                            >
                              <TextField
                                type="text"
                                label={`Ingrediente ${index + 1}`}
                                name={`portions.${index}`}
                                onChange={handleChange}
                                onBlur={(event) => {
                                  formikHandleBlur(event);
                                  handleBlur(event);
                                }}
                                value={value}
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={2}>
                            <IconButton
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
                        onClick={() => handleAdd({ push })}
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
          </FieldArray>
        </Form>
      )}
    />
  );
};

export default MealRegister;
