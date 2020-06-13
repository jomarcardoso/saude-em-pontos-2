import React, { useState, useContext } from 'react';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Advertise from '../components/advertise';
import AccountContext from '../contexts/account-context';
import { Account, SHAPE_ACCOUNT } from '../services/account.service';
import { CurrentPage } from '../services/page.service';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Quiz from '../components/quiz';
import Layout from '../components/layout/layout';
import MealCard from '../components/meal-card';

const useStyles = makeStyles({});

const Index: React.SFC = () => {
  const {
    account = SHAPE_ACCOUNT,
  }: {
    account: Account;
  } = useContext(AccountContext);

  const [readAdvertise, setReadAdvertise] = useState(false);
  const rendered = typeof window !== 'undefined';
  const registeredUser = account.user.name;
  const classes = useStyles();

  if (rendered && !registeredUser) {
    if (!readAdvertise) {
      return (
        <Layout showFooter={false} showHeader={false}>
          <Advertise />
          <Typography>
            <Button onClick={(): void => setReadAdvertise(true)}>
              Avançar
            </Button>
          </Typography>
        </Layout>
      );
    }

    return (
      <Layout showFooter={false} showHeader={false}>
        <Quiz />
        <Typography>
          <Link to="/menu">Tudo pronto</Link>
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout currentPage={CurrentPage.HOME} pageName="Menu">
      <Grid container spacing={4}>
        {account.meals.map((meal) => (
          <Grid item xs={12} sm={6}>
            <MealCard meal={meal} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;
