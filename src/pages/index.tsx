import React, { FC, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Advertise from '../components/advertise';
import AccountContext from '../contexts/account-context';
import { AccountAndSet, SHAPE_ACCOUNT } from '../services/account.service';
import { CurrentPage } from '../services/page.service';
import Layout from '../components/layout/layout';
import MealCard from '../components/meal-card';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
});

const Index: FC = () => {
  const { account = SHAPE_ACCOUNT, setAccount }: AccountAndSet = useContext(
    AccountContext,
  );
  const rendered = typeof window !== 'undefined';
  const classes = useStyles();

  if (rendered && !account.hasReadAdvertise) {
    return (
      <Layout showFooter={false} showHeader={false}>
        <Advertise />
        <Typography>
          <Button onClick={(): void => setAccount.hasReadAdvertise(true)}>
            Avançar
          </Button>
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout currentPage={CurrentPage.HOME} pageName="Menu">
      <Grid container spacing={4}>
        {account.meals.map((meal) => (
          <Grid item xs={12} sm={6} className={classes.card}>
            <MealCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;
