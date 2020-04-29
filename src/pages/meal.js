import React from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql } from "gatsby";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function useFood() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: {eq: "food.json"}) {
        childDbJson {
          foods {
            name,
            id
          }
        }
      }
    }
  `);

  return data.file.childDbJson.foods;
}

export default function Meal({ data }) {
  const foods = useFood();

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Layout currentPage="meal" pageName="Cadastrar refeição">
      <form action="/" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputLabel id="food">Alimento</InputLabel>
            <Select labelId="food" id="select" value={0}>
              <MenuItem value={0} />
              {foods.map((food) => (
                <MenuItem value={food.id}>{food.name}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar refeição
            </Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  )
}