import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Meal } from '../services/meal';

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

interface RenderResultArgs {
  name: string;
  value: number | string;
  status: Status;
}

type RenderResult = (ags: RenderResultArgs) => ReactElement;

const ScoreComponent: React.SFC<Props> = ({ meal }) => {
  const classes = useStyles();
  const getAcidificationStatus = () => {
    if (meal.gi > 75) return Status.danger;
    if (meal.gi > 50) return Status.warn;

    return Status.ok;
  };

  const getCaloriesStatus = () => {
    if (meal.calories > 600) return Status.danger;
    if (meal.calories > 300) return Status.warn;

    return Status.ok;
  };

  const renderResult: RenderResult = ({
    name = '',
    value = '',
    status = Status.ok,
  }) => {
    return (
      <Grid item xs={6} sm={4} className={classes.result}>
        <Box
          borderColor={status}
          border={2}
          className={classes.result}
          borderRadius={4}
        >
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
  };

  return (
    <Grid container spacing={2}>
      {renderResult({
        name: 'Calorias Totais',
        value: meal.calories,
        status: getCaloriesStatus(),
      })}
      {renderResult({
        name: 'Índice Glicêmico',
        value: meal.gi,
        status: getAcidificationStatus(),
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
