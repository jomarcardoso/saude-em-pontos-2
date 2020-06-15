import React, { useContext } from 'react';
import Layout from '../components/layout/layout';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TimeService from '../services/vendors/time.service';
import { SHAPE_ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { Meal, SHAPE_MEAL } from '../services/meal.service';
import ResumedPortion from '../components/resumed-portion';
import Box from '@material-ui/core/Box';
import ScoreComponent from '../components/score';
import MealRegisterComponent from '../components/meal-register';
import { CurrentPage } from '../services/page.service';

const useStyles = makeStyles({
  portionsContainer: {
    padding: '30px',
  },
});

export default function MealPage(location) {
  const classes = useStyles();
  const id = Number(location?.location?.hash?.replace('#', '') ?? 0);
  const { account = SHAPE_ACCOUNT, setAccount } = useContext(AccountContext);
  const meal: Meal = account.meals[id] ?? SHAPE_MEAL;

  return (
    <Layout pageName="Refeição" currentPage={CurrentPage.MEAL}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <MealRegisterComponent meal={meal} setAccount={setAccount} />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h2" variant="h2">
            {TimeService.toLongSring(meal.date)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ScoreComponent meal={meal} />
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.portionsContainer} bgcolor="grey.600">
            <Grid container spacing={2} component="ul" justify="center">
              {meal.portions.map((portion) => (
                <ResumedPortion xs={6} sm={4} md={3} lg={2} portion={portion} />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
