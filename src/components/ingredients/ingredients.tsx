import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Portion } from '../../services/portion/portion.types';
import Image from '../image';
import { FOOD } from '../../services/food';
import Section from '../section/section';

interface Props {
  portions: Array<Portion>;
}

const Ingredients: FC<Props> = ({ portions = [] }) => {
  return (
    <Section title="Ingredientes">
      <List>
        {portions.map(({ food = FOOD, description = '' }) => (
          <ListItem button disableGutters>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={2}>
                <Image src={food.image} alt={food.name} />
              </Grid>
              <Grid item xs={10}>
                <Typography>{description}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

export default Ingredients;
