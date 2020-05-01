import React from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CurrentPage } from '../services/account.service';

function useFood() {
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
}

const useStyles = makeStyles({
  selectIcon: {
    minWidth: '20px',
    width: '20px',
    marginRight: '10px',
  },
  img: {
    width: '100%',
  },
});

interface Props {}

const Meal: React.SFC<Props> = () => {
  const foods = useFood();
  const classes = useStyles();

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Layout currentPage={CurrentPage.MEAL} pageName="Cadastrar refeição">
      <form action="/" method="post" onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <InputLabel id="food">Alimento</InputLabel>
            <Select labelId="food" id="select" value={0}>
              <MenuItem value={0} />
              {foods.map((food) => (
                <MenuItem value={food.id}>
                  <ListItemIcon className={classes.selectIcon}>
                    <img className={classes.img} src={food.image} alt="" />
                  </ListItemIcon>
                  <ListItemText primary={food.name} />
                </MenuItem>
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
  );
};

export default Meal;
