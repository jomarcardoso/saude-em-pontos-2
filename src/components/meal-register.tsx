import React, { FC, useContext, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Formik, Form, FieldArray, ArrayHelpers } from 'formik';
import { Typography } from '@material-ui/core';
import Image from './image';
import { MealData } from '../services/meal.service';
import SubmitComponent from './submit';
import AccountContext from '../contexts/account-context';
import PortionService from '../services/portion/portion.service';
import FoodsContext from '../contexts/foods-context';
import ResumedPortion from './resumed-portion';

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
  const editing = true;

  const initialFullPortions = portions.map((portionToProcess) => {
    return PortionService.portionFromString({
      text: portionToProcess,
      foods,
    });
  });

  const [fullPortions, setFullPortions] = useState(initialFullPortions);

  if (!portions.length) {
    portions = [''];
  }

  function handleBlur({ target: { value = '' } }, index = 0) {
    const portion = PortionService.portionFromString({
      text: value,
      foods,
    });

    const copyFullPortions = [...fullPortions];

    copyFullPortions[index] = portion;

    setFullPortions(copyFullPortions);
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
                  <Grid container spacing={editing ? 3 : 1}>
                    {values.portions.map((value, index) => (
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                          {editing ? (
                            <ResumedPortion
                              portion={fullPortions[index]}
                              xs={2}
                              hideBadge
                              padding={6}
                            />
                          ) : (
                            <Grid item xs={1}>
                              <Image
                                src={fullPortions[index].food.image}
                                alt={fullPortions[index].food.name}
                              />
                            </Grid>
                          )}
                          <Grid item xs={editing ? 10 : 11}>
                            <FormControl
                              variant="standard"
                              className={classes.formControl}
                            >
                              {editing ? (
                                <TextField
                                  variant="filled"
                                  type="text"
                                  label={
                                    <>
                                      {`Ingrediente ${index + 1}`}
                                      <IconButton
                                        color="secondary"
                                        aria-label={`remover alimento ${
                                          index + 1
                                        }`}
                                        onClick={() => remove(index)}
                                        size="small"
                                      >
                                        <CloseIcon fontSize="small" />
                                      </IconButton>
                                    </>
                                  }
                                  name={`portions.${index}`}
                                  onChange={handleChange}
                                  onBlur={(event) => {
                                    formikHandleBlur(event);
                                    handleBlur(event, index);
                                  }}
                                  value={value}
                                />
                              ) : (
                                <Typography>{value}</Typography>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    {editing && (
                      <Grid item xs={12}>
                        <Button variant="outlined" onClick={() => push('')}>
                          Adicionar
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                {editing && (
                  <Grid item xs={12}>
                    <SubmitComponent>Cadastrar refeição</SubmitComponent>
                  </Grid>
                )}
              </Grid>
            )}
          </FieldArray>
        </Form>
      )}
    />
  );
};

export default MealRegister;
