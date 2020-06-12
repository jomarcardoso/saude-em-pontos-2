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
import ResumedPortion from '../components/resumed-portion';
import Box from '@material-ui/core/box';

enum Status {
  ok = 'success.main',
  warn = 'warning.main',
  danger = 'error.main',
}

const useStyles = makeStyles({
  result: {
    display: 'flex',
    flex: 1,
  },
  card: {
    flex: 1,
  },
  portionsContainer: {
    backgroundColor: '#efefef',
    padding: '30px',
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

  function renderResult({
    name,
    value,
    status,
  }: {
    name: string;
    value: number | string;
    status: Status;
  }) {
    return (
      <Grid item xs={6} sm={4} className={classes.result}>
        <Box borderColor={status} border={1} className={classes.result}>
          <Card className={classes.card}>
            <CardContent>
              <Typography component="p" variant="h1" align="center">
                {value}
              </Typography>
              <Typography component="h3" variant="h6" align="center">
                {name}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    );
  }

  function renderResults() {
    return (
      <Grid container spacing={2}>
        {renderResult({
          name: 'Calorias Totais',
          value: meal.calories,
          status: Status.ok,
        })}
        {renderResult({
          name: 'Índice Glicêmico médio',
          value: meal.gi,
          status: Status.warn,
        })}
        {renderResult({
          name: 'Acidificação',
          value: meal.gi,
          status: Status.danger,
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
