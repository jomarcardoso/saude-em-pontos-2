import React from 'react';
import Badge from '@material-ui/core/Badge';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Portion } from '../services/portion.service';
import Image from './image';

const useStyles = makeStyles({
  box: {
    display: 'flex',
  },
  card: {
    display: 'flex',
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    flex: 1,
  },
});

interface Props extends GridProps {
  portion: Portion;
}

const ResumedPortion: React.SFC<Props> = ({ portion, ...props }) => {
  const classes = useStyles();

  return (
    <Grid item {...props} className={classes.box}>
      <Card variant="outlined" className={classes.card}>
        <CardContent className={classes.card}>
          <Badge
            className={classes.badge}
            badgeContent={portion.quantity}
            color="secondary"
            component="div"
          >
            <Image src={portion.food.image} alt={portion.food.name} />
          </Badge>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ResumedPortion;
