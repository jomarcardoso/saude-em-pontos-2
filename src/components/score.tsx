import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Meal } from '../services/meal.service';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

enum Status {
  ok = 'success.main',
  warn = 'warning.main',
  danger = 'error.main',
}

const useStyles = makeStyles({
  result: {
    display: 'flex',
    flex: 1,
  },
  card: {
    flex: 1,
  },
});

interface Props {
  meal: Meal;
}

const ScoreComponent: React.SFC<Props> = ({ meal }) => {
  const classes = useStyles();

  function renderResult({
    name,
    value,
    status,
  }: {
    name: string;
    value: number | string;
    status: Status;
  }) {
    return (
      <Grid item xs={6} sm={4} className={classes.result}>
        <Box borderColor={status} border={1} className={classes.result}>
          <Card className={classes.card}>
            <CardContent>
              <Typography component="p" variant="h1" align="center">
                {Math.round(Number(value))}
              </Typography>
              <Typography component="h3" variant="h6" align="center">
                {name}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {renderResult({
        name: 'Calorias Totais',
        value: meal.calories,
        status: Status.ok,
      })}
      {renderResult({
        name: 'Índice Glicêmico médio',
        value: meal.gi,
        status: Status.warn,
      })}
      {renderResult({
        name: 'Acidificação',
        value: meal.gi,
        status: Status.danger,
      })}
    </Grid>
  );
};

export default ScoreComponent;
