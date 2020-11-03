import React, { useContext, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FoodsContext from '../contexts/foods-context';
import { makeStyles } from '@material-ui/core/styles';
import SubmitComponent from '../components/submit';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { SetAccount } from '../services/account.service';
import { MealData } from '../services/meal.service';
import { Formik, Form, FieldArray } from 'formik';
import InputImage from './input-image';
import Photo from './photo';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
});

interface Props {
  mealData: MealData;
  setAccount: SetAccount;
  setId: (id: number) => void;
}

const MealRegisterComponent: React.SFC<Props> = ({
  mealData,
  setAccount,
  setId,
}) => {
  const classes = useStyles();
  const foods = useContext(FoodsContext);
  let { portions, picture: pictureData = '' } = mealData;
  // const [picture, setPicture] = useState(pictureData);

  // console.log(pictureData);

  if (!portions.length) {
    portions = [
      {
        foodId: 0,
        quantity: 0,
      },
    ];
  }

  function handleRemove({ index = 0, remove }) {
    console.log(index, remove);
    remove(index);
  }

  function handleAdd(push) {
    push({
      foodId: 0,
      quantity: 0,
    });
  }

  function handleSubmit({ portions, picture = '' } = {}): void {
    event.preventDefault();

    console.log(picture);

    const id = setAccount.meal({
      portions,
      date: mealData?.date
        ? new Date(mealData?.date).toString()
        : new Date().toString(),
      id: mealData?.id ?? 0,
      picture,
    });
    setId(id);
  }

  return (
    <Formik
      initialValues={{ portions, picture: pictureData }}
      onSubmit={handleSubmit}
      render={({ values, handleBlur, handleChange, setValues }) => (
        <Form action="/" method="post">
          <FieldArray
            name="portions"
            render={({ push, remove }) => (
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputImage
                    image={values.picture}
                    setImage={(picture) => {
                      setValues({
                        ...values,
                        picture,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {values.portions.map((value, index) => (
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item xs={6}>
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
                          <Grid item xs={4}>
                            <TextField
                              type="number"
                              label={`Quantidade ${index + 1}`}
                              name={`portions[${index}].quantity`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.portions[index].quantity}
                            />
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
