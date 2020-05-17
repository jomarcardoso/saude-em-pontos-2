import React, { useEffect, useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { CurrentPage } from '../services/page.service';
import { useForm } from '../components/vendors/agnostic-components/form/use-form';
import Layout from '../components/layout';
import Select from '../components/form/select';
import InputNumber from '../components/form/input-number';
import AccountContext from '../components/account-context';
import { PortionData } from '../services/meal.service';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FoodsContext from '../contexts/foods-context';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
});

const MealPage: React.SFC = () => {
  const classes = useStyles();
  const foods = useContext(FoodsContext);
  const formFood = useForm();
  const formQuantity = useForm();
  const arrayOfValues = Object.values(formFood.values);
  const { account, setAccount } = useContext(AccountContext);

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();

    const portionsData: Array<PortionData> = Object.values(formFood.values)
      .map((food, index) => ({
        foodId: Number(food),
        quantity: formQuantity.values[`quantity${index}`],
      }))
      .filter(({ foodId }) => foodId);

    setAccount.meal(portionsData);
  }

  const options = foods.map((food) => ({
    ...food,
    value: String(food.id),
  }));

  useEffect(() => {
    if (!arrayOfValues.every((value) => value)) return;

    formFood.setValueByName(`food${arrayOfValues.length}`, '');
  }, [formFood]);

  return (
    <Layout currentPage={CurrentPage.MEAL} pageName="Cadastrar refeição">
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
                          form={formFood}
                          label={`Alimento ${index + 1}`}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <InputNumber
                        label={`Quantidade ${index + 1}`}
                        name={`quantity${index}`}
                        form={formQuantity}
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
            <Button type="submit" variant="contained" color="primary">
              Cadastrar refeição
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default MealPage;
