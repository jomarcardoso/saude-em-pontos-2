import React from 'react';
import Layout from '../components/layout';
import Grid from '@material-ui/core/Grid';
import { Food } from '../services/food.service';
import Table from '@material-ui/core/Table';
import { Typography } from '@material-ui/core';

const FoodPage: React.SFC = ({
  pageContext: { image, name, glicemicIndex, calories },
}: {
  pageContext: Food;
}) => {
  return (
    <Layout pageName={name}>
      <Grid container spacing={5} justify="center">
        <Grid item xs={8}>
          <img src={image} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant="h6" component="h2">
                Índice Glicêmico
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{glicemicIndex}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Typography variant="h6" component="h2">
                Calorias
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{calories}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FoodPage;