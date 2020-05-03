import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CurrentPage } from '../services/page.service';
import { Food } from '../services/food.service';
import { useForm } from '../components/vendors/agnostic-components/form/use-form';
import Layout from '../components/layout';
import Select from '../components/form/select';

const useFood = (): Array<Food> => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "food.json" }) {
        childDbJson {
          foods {
            name
            id
            image
          }
        }
      }
    }
  `);

  return data.file.childDbJson.foods;
};

const Meal: React.SFC = () => {
  const foods = useFood();
  const form = useForm();

  function handleSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
  }

  const options = foods.map((food) => ({
    ...food,
    value: String(food.id),
  }));

  return (
    <Layout currentPage={CurrentPage.MEAL} pageName="Cadastrar refeição">
      <form action="/" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <InputLabel id="food">Alimento</InputLabel>
            <Select options={options} name="food" form={form} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar refeição
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
};

export default Meal;
