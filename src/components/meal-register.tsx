import React, { useEffect, useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Select from '../components/form/select';
import InputNumber from '../components/form/input-number';
import { PortionData } from '../services/portion.service';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FoodsContext from '../contexts/foods-context';
import { makeStyles } from '@material-ui/core/styles';
import SubmitComponent from '../components/submit';
import Grid from '@material-ui/core/Grid';
import { SetAccount } from '../services/account.service';
import { useForm } from '../components/vendors/agnostic-components/form';
import { MealData } from '../services/meal.service';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
});

interface Props {
  mealData: MealData;
  setAccount: SetAccount;
}

const MealRegisterComponent: React.SFC<Props> = ({ mealData, setAccount }) => {
  const classes = useStyles();
  const foods = useContext(FoodsContext);

  const options = foods.map((food) => ({
    ...food,
    value: String(food.id),
  }));

  const initialValues = mealData.portions.reduce((previous, portion, index) => {
    return {
      ...previous,
      [`food${index}`]: String(portion.foodId),
      [`quantity${index}`]: String(portion.quantity),
    };
  }, {});

  const form = useForm({ initialValues });

  const arrayOfValues = Object.entries(form.fields.values).reduce(
    (previous, [key, value]) => {
      if (/^food/.test(key)) {
        return [...previous, value];
      }

      return [...previous];
    },
    []
  );

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    const portions: Array<PortionData> = Object.values(form.fields.values)
      .map((food, index) => ({
        foodId: Number(food),
        quantity: Number(form.fields.values[`quantity${index}`]),
      }))
      .filter(({ foodId }) => foodId);

    setAccount.meal({
      portions,
      date: mealData?.date
        ? new Date(mealData?.date).toString()
        : new Date().toString(),
      id: mealData?.id ?? 0,
    });
  }

  useEffect(() => {
    if (!arrayOfValues.every((value) => value)) return;

    form.fields.setValueByName(`food${arrayOfValues.length}`, '');
  }, [form]);

  return (
    <form action="/" method="post" onSubmit={handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {arrayOfValues.map((value, index) => (
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
                        options={options}
                        name={`food${index}`}
                        fields={form.fields}
                        label={`Alimento ${index + 1}`}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <InputNumber
                      label={`Quantidade ${index + 1}`}
                      name={`quantity${index}`}
                      fields={form.fields}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      variant="outlined"
                      color="secondary"
                      aria-label={`remover alimento ${index + 1}`}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SubmitComponent>Cadastrar refeição</SubmitComponent>
        </Grid>
      </Grid>
    </form>
  );
};

export default MealRegisterComponent;
