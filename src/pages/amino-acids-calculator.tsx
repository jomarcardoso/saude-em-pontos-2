import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/layout/layout';
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

  return (
    <Layout pageName="Calculadora de Amino Ácidos">
      <Grid container spacing={5}>
        <Grid item xs={12}></Grid>
      </Grid>
    </Layout>
  );
}
