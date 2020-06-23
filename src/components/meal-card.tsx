import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TimeService from '../services/vendors/time.service';
import Avatar from '@material-ui/core/Avatar';
import ResumedPortion from '../components/resumed-portion';
import Grid from '@material-ui/core/Grid';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import { Meal } from '../services/meal.service';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  content: {
    backgroundColor: 'info.main',
  },
  cardLink: {
    display: 'flex',
    flex: 1,
  },
  card: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  cardBody: {
    flex: 1,
  },
});

interface Props {
  meal: Meal;
}

const MealCard: React.SFC<Props> = ({ meal }) => {
  const classes = useStyles();

  return (
    <Link to={`/meal#${meal.id}`} state={{ meal }} className={classes.cardLink}>
      <Card variant="outlined" className={classes.card}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          color="textSecondary"
          title={TimeService.toLongSring(meal.date)}
        />
        <Box bgcolor="grey.600" className={classes.cardBody}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {meal.portions.map((portion) => (
                    <ResumedPortion portion={portion} xs={4} />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
        <CardContent>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography variant="h3">Calorias:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4">{meal.calories}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MealCard;
