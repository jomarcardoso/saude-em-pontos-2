import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/layout';

// const useStyles = makeStyles({
//   result: {
//     display: 'flex',
//   },
//   card: {
//     flex: 1,
//   },
// });

export default function MealPage() {
  // const classes = useStyles();

  return (
    <Layout pageName="Calculadora de Amino Ácidos">
      <Grid container spacing={5}>
        <Grid item xs={12} />
      </Grid>
    </Layout>
  );
}
