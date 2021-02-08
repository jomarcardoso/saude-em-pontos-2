import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Food } from '../services/food.service';
import Layout from '../components/layout/layout';
import AminoAcidsTable from '../components/aminoacids-table';

const FoodPage: React.FC = ({
  pageContext: {
    image,
    name: foodName,
    gi,
    calories,
    carbohydrates,
    gl,
    aminoAcids,
  },
}: {
  pageContext: Food;
}) => {
  function renderQuality({ name, value }) {
    return (
      <Grid container spacing={1} justify="space-between">
        <Grid item>
          <Typography variant="h6" component="h2">
            {name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Layout pageName={foodName}>
      <Grid container spacing={5} justify="center">
        <Grid item xs={8} sm={6} md={4}>
          <img src={image} alt="" />
        </Grid>
        <Grid item xs={12}>
          {renderQuality({ name: 'Índice Glicêmico', value: gi })}
          {renderQuality({ name: 'Calorias', value: calories })}
          {renderQuality({ name: 'Carboidratos', value: carbohydrates })}
          {renderQuality({ name: 'Carga Glicêmica', value: gl })}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h2">
                Tabela de aminoácidos
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AminoAcidsTable aminoAcids={aminoAcids} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default FoodPage;
