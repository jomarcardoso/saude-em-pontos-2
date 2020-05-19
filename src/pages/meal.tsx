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

export default function MealPage(location) {
  const id = Number(location?.location?.hash?.replace('#', '') ?? 0);
  const {
    account = SHAPE_ACCOUNT,
  }: {
    account: Account;
  } = useContext(AccountContext);
  const meal: Meal = account.meals[id] ?? SHAPE_MEAL;

  function renderResults() {
    return (
      <Grid container>
        <Grid item>
          <Card variant="outlined">
            <CardContent>{meal.calories}</CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <Layout pageName="Refeição">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography component="h2">
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
