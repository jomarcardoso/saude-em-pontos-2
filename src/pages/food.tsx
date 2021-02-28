import React, { FC, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { Food } from '../services/food';
import Layout from '../components/layout/layout';
import AminoAcidsTable from '../components/aminoacids-table';
import Image from '../components/image';

enum Version {
  RAW = 'RAW',
  JUICE = 'JUICE',
  BOILED = 'BOILED',
  FLOUR = 'FLOUR',
}

interface Props {
  pageContext: Food;
}

const FoodPage: FC<Props> = ({ pageContext: food }) => {
  const [version, setVersion] = useState<Version>(Version.RAW);

  const { aminoAcids } = food;
  let { image, name, gi, calories, carbohydrates, gl } = food;

  if (version === Version.JUICE) {
    image = food.juice.image;
    name = food.juice.name;
    gi = food.juice.gi;
    calories = food.juice.calories;
    carbohydrates = food.juice.carbohydrates;
    gl = food.juice.gl;
  }

  function renderQuality({ name: foodName = '', value = 0 }) {
    return (
      <ListItem>
        <Grid container spacing={1} justify="space-between">
          <Grid item>
            <Typography component="h2">{foodName}</Typography>
          </Grid>
          <Grid item>
            <Typography>{value}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }

  return (
    <Layout pageName={name}>
      <Grid container spacing={5} justify="center">
        <Grid item xs={12}>
          <Grid container spacing={5} justify="center">
            <Grid item>
              <Button
                variant={version === Version.RAW ? 'contained' : 'outlined'}
                onClick={() => setVersion(Version.RAW)}
              >
                cru
              </Button>
            </Grid>
            {food.juice.name && (
              <Grid item>
                <Button
                  variant={version === Version.JUICE ? 'contained' : 'outlined'}
                  onClick={() => setVersion(Version.JUICE)}
                >
                  suco
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={8} sm={6} md={4}>
          <Image src={image} alt="" />
        </Grid>
        <Grid item xs={12}>
          <List>
            {renderQuality({ name: 'Índice Glicêmico', value: gi })}
            {renderQuality({ name: 'Calorias', value: calories })}
            {renderQuality({ name: 'Carboidratos', value: carbohydrates })}
            {renderQuality({ name: 'Carga Glicêmica', value: gl })}
          </List>
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
