import React, { useEffect, useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Layout from '../components/layout/layout';
import Select from '../components/form/select';
import InputNumber from '../components/form/input-number';
import { PortionData } from '../services/portion.service';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FoodsContext from '../contexts/foods-context';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TimeService from '../services/vendors/time.service';
import { SHAPE_ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { Account } from '../services/account.service';
import { Meal, SHAPE_MEAL } from '../services/meal.service';
import ResumedPortion from '../components/resumed-portion';
import Box from '@material-ui/core/box';
import { useForm } from '../components/vendors/agnostic-components/form';
import SubmitComponent from '../components/submit';
import ScoreComponent from '../components/score';

const useStyles = makeStyles({
  portionsContainer: {
    backgroundColor: '#efefef',
    padding: '30px',
  },
  formControl: {
    display: 'flex',
  },
});

export default function MealPage(location) {
  const classes = useStyles();
  const id = Number(location?.location?.hash?.replace('#', '') ?? 0);
  const {
    account = SHAPE_ACCOUNT,
    setAccount,
  }: {
    account: Account;
  } = useContext(AccountContext);
  const meal: Meal = account.meals[id] ?? SHAPE_MEAL;
  const foods = useContext(FoodsContext);
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
  const options = foods.map((food) => ({
    ...food,
    value: String(food.id),
  }));

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
    <Layout pageName="Refeição">
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
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h2">
            {TimeService.toLongSring(meal.date)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ScoreComponent meal={meal} />
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.portionsContainer}>
            <Grid container spacing={2} component="ul" justify="center">
              {meal.portions.map((portion) => (
                <ResumedPortion xs={6} sm={4} md={3} lg={2} portion={portion} />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
