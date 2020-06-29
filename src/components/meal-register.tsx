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
import { isArray } from '../services/vendors/validate';

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

  const options = foods.map((food) => ({
    ...food,
    value: String(food.id),
  }));

  const initialValues = mealData.portions.reduce(
    (previous, { foodId, quantity }) => {
      return {
        ...previous,
        foodId: [...previous.foodId, foodId],
        quantity: [...previous.quantity, quantity],
      };
    },
    { foodId: [], quantity: [] }
  );

  const foodForm = useForm({ initialValues });

  function handleClickRemove(index) {
    foodForm.removeFieldByName(`food${index}`);
  }

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    const portions: Array<PortionData> = foodForm.fields.values.foodId
      .map((foodId, index) => ({
        foodId: Number(foodId),
        quantity: Number(foodForm.fields.values.quantity[index]),
      }))
      .filter(({ foodId }) => foodId);

    const id = setAccount.meal({
      portions,
      date: mealData?.date
        ? new Date(mealData?.date).toString()
        : new Date().toString(),
      id: mealData?.id ?? 0,
    });

    setId(id);
  }

  useEffect(() => {
    const { foodId } = foodForm.fields.values;
    if (!isArray(foodId)) return;
    if (!foodId.every((value) => value)) return;

    foodForm.fields.setValueByName(`foodId${foodId.length}`, '');
  }, [foodForm]);

  return (
    <form action="/" method="post" onSubmit={handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {foodForm.fields.values.foodId.map((value, index) => (
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
                        name={`foodId${index}`}
                        fields={foodForm.fields}
                        label={`Alimento ${index + 1}`}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <InputNumber
                      label={`Quantidade ${index + 1}`}
                      name={`quantity${index}`}
                      fields={foodForm.fields}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      variant="outlined"
                      color="secondary"
                      aria-label={`remover alimento ${index + 1}`}
                      onClick={() => handleClickRemove(index)}
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
