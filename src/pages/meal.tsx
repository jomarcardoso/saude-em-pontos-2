import React, { FC, useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Layout from '../components/layout/layout';
import { SHAPE_ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { MealService, Meal, MEAL } from '../services/meal';
import ScoreComponent from '../components/score';
import MealRegister from '../components/meal-register';
import { CurrentPage } from '../services/page.service';
import AminoAcidsTable from '../components/aminoacids-table';

const MealPage: FC<{ location: Location }> = ({ location }) => {
  const initialId = Number(location?.hash?.replace('#', '') ?? 0);
  const [id, setId] = useState(initialId);
  const { account = SHAPE_ACCOUNT } = useContext(AccountContext);
  const meal: Meal =
    account.meals.find(({ id: mealId }) => mealId === id) ?? MEAL;
  const mealData = MealService.unFormat(meal);

  return (
    <Layout currentPage={CurrentPage.MEAL} showHeader={false}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MealRegister mealData={mealData} meal={meal} setId={setId} />
        </Grid>
        <Grid item xs={12}>
          <ScoreComponent meal={meal} />
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
