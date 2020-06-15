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
import { Account } from '../services/account.service';
import { useForm } from '../components/vendors/agnostic-components/form';
import { Meal } from '../services/meal.service';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
});

interface Props {
  meal: Meal;
}

const MealRegisterComponent: React.SFC<Props> = ({ meal, setAccount }) => {
  const classes = useStyles();
  const foods = useContext(FoodsContext);

  const options = foods.map((food) => ({
    ...food,
    value: String(food.id),
  }));

  const initialValues = meal.portions.reduce((previous, portion, index) => {
    return {
      ...previous,
      [`food${index}`]: String(portion.food.id),
      [`quantity${index}`]: String(portion.quantity),
    };
  }, {});

  const form = useForm({ initialValues });
  const formQuantity = useForm({ initialValues });

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

    const portionsData: Array<PortionData> = Object.values(form.fields.values)
      .map((food, index) => ({
        foodId: Number(food),
        quantity: formQuantity.fields.values[`quantity${index}`],
      }))
      .filter(({ foodId }) => foodId);

    setAccount.meal(portionsData);
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
                      fields={formQuantity.fields}
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
