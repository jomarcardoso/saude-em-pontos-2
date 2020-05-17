import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Layout from '../components/layout/layout';
import { Food } from '../services/food.service';

const useFood = (): Array<Food> => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "food.json" }) {
        childDbJson {
          foods {
            name
            enName
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
  anchor: {
    display: 'inherit',
    justifyContent: 'inherit',
    alignItems: 'inherit',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

const Foods: React.SFC = () => {
  const foods = useFood();
  const classes = useStyles();
  const orderedFood = foods.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return (
    <Layout pageName="Alimentos">
      <List component="nav" aria-label="main mailbox folders" dense>
        {orderedFood.map(({ name, image, enName }) => (
          <li>
            <ListItem>
              <Link
                to={`/food/${enName}`}
                className={classes.anchor}
                color="inherit"
              >
                <ListItemIcon className={classes.selectIcon}>
                  <img className={classes.img} src={image} alt="" />
                </ListItemIcon>
                <ListItemText primary={name} />
              </Link>
            </ListItem>
            <Divider />
          </li>
        ))}
      </List>
    </Layout>
  );
};

export default Foods;
