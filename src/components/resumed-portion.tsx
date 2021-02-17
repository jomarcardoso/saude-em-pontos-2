import React, { FC } from 'react';
import Badge from '@material-ui/core/Badge';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Portion, SHAPE_PORTION } from '../services/portion/portion.types';
import Image from './image';

const useStyles = makeStyles({
  box: {
    display: 'flex',
  },
  card: (padding = 0) => ({
    display: 'flex',
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    padding: padding || null,
    '&:last-child': {
      paddingBottom: padding || null,
    },
  }),
  badge: {
    flex: 1,
  },
});

interface Props extends GridProps {
  portion: Portion;
  hideBadge?: boolean;
  padding?: number;
}

const ResumedPortion: FC<Props> = ({
  portion = SHAPE_PORTION,
  hideBadge = false,
  padding = 0,
  ...props
}) => {
  const classes = useStyles(padding);

  return (
    <Grid item {...props} className={classes.box}>
      <Card variant="outlined" className={classes.card}>
        <CardContent className={classes.card}>
          <Badge
            max={9999}
            className={classes.badge}
            badgeContent={!hideBadge ? `${portion.quantity}g` : null}
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
