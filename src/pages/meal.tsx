import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/layout/layout';
import TimeService from '../services/vendors/time.service';
import { SHAPE_ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { Account } from '../services/account.service';
import { Meal, SHAPE_MEAL } from '../services/meal.service';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  result: {
    display: 'flex',
  },
  card: {
    flex: 1,
  },
});

export default function MealPage(location) {
  const classes = useStyles();
  const id = Number(location?.location?.hash?.replace('#', '') ?? 0);
  const {
    account = SHAPE_ACCOUNT,
  }: {
    account: Account;
  } = useContext(AccountContext);
  const meal: Meal = account.meals[id] ?? SHAPE_MEAL;

  function renderResult({ name, value }) {
    return (
      <Grid item xs={6} sm={4} className={classes.result}>
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography component="p" variant="h1" align="center">
              {value}
            </Typography>
            <Typography component="h3" variant="h6" align="center">
              {name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  function renderResults() {
    return (
      <Grid container spacing={2}>
        {renderResult({ name: 'Calorias Totais', value: meal.calories })}
        {renderResult({
          name: 'Índice Glicêmico médio',
          value: meal.gi,
        })}
      </Grid>
    );
  }

  return (
    <Layout pageName="Refeição">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography component="h2" variant="h2">
            {TimeService.toLongSring(meal.date)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {renderResults()}
        </Grid>
      </Grid>
    </Layout>
  );
}
