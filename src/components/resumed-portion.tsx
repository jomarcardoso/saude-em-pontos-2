import React from 'react';
import Badge from '@material-ui/core/Badge';
import Image from '../components/image';
import Grid, { GridProps } from '@material-ui/core/grid';
import { Portion } from '../services/portion.service';
import Card from '@material-ui/core/card';
import CardContent from '@material-ui/core/CardContent';

interface Props extends GridProps {
  portion: Portion;
}

const ResumedPortion: React.SFC<Props> = ({ portion, ...props }) => {
  return (
    <Grid item {...props}>
      <Card variant="outlined">
        <CardContent>
          <Badge badgeContent={portion.quantity} color="secondary">
            <Image src={portion.food.image} alt={portion.food.name} />
          </Badge>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ResumedPortion;
