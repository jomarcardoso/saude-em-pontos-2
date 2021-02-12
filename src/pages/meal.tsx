import React, { FC, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Layout from '../components/layout/layout';
import TimeService from '../services/vendors/time.service';
import { SHAPE_ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import MealService, { Meal, SHAPE_MEAL } from '../services/meal.service';
import ResumedPortion from '../components/resumed-portion';
import ScoreComponent from '../components/score';
import MealRegisterComponent from '../components/meal-register';
import { CurrentPage } from '../services/page.service';
import AminoAcidsTable from '../components/aminoacids-table';

const useStyles = makeStyles({
  portionsContainer: {
    padding: '30px',
  },
});

const MealPage: FC<{ location: Location }> = ({ location }) => {
  const classes = useStyles();
  const initialId = Number(location?.hash?.replace('#', '') ?? 0);
  const [id, setId] = useState(initialId);
  const { account = SHAPE_ACCOUNT, setAccount } = useContext(AccountContext);
  const meal: Meal =
    account.meals.find(({ id: mealId }) => mealId === id) ?? SHAPE_MEAL;
  const mealData = MealService.unFormat(meal);

  return (
    <Layout pageName="Refeição" currentPage={CurrentPage.MEAL}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <MealRegisterComponent
            mealData={mealData}
            setAccount={setAccount}
            setId={setId}
          />
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
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h2">
                Tabela de aminoácidos
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AminoAcidsTable aminoAcids={meal.aminoAcids} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MealPage;
