import React from 'react';
import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CurrentPage } from '../services/page.service';
import { Food } from '../services/food.service';
import useForm from '../components/form/with-form/use-form';
import Selectoi from '../components/form/select/select';
import Select from '@material-ui/core/Select';

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

const Meal: React.SFC = () => {
  const foods = useFood();
  const classes = useStyles();
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
            <Selectoi
              form={form}
              name="ai"
              render={(selectProps) => (
                <Select labelId="food" id="select" value={0} {...selectProps}>
                  {selectProps.children}
                </Select>
              )}
              renderOptions={(optionProps) => (
                <MenuItem value={optionProps.value}>
                  <ListItemIcon className={classes.selectIcon}>
                    <img
                      className={classes.img}
                      src={optionProps.image}
                      alt=""
                    />
                  </ListItemIcon>
                  <ListItemText primary={optionProps.name} />
                </MenuItem>
              )}
              options={options}
            />
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
