import React from 'react';
import Layout from '../components/layout';
import Grid from '@material-ui/core/Grid';
import { Food } from '../services/food.service';

const FoodPage: React.SFC = ({
  pageContext: { image },
}: {
  pageContext: Food;
}) => {
  return (
    <Layout>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <img src={image} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FoodPage;
