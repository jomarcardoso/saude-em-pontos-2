import React, { FC, useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Layout from '../components/layout/layout';
import { SHAPE_ACCOUNT } from '../services/account.service';
import AccountContext from '../contexts/account-context';
import { MealService, MEAL_DATA, MEAL } from '../services/meal';
import ScoreComponent from '../components/score';
import MealRegister from '../components/meal-register';
import { CurrentPage } from '../services/page.service';
import AminoAcidsTable from '../components/aminoacids-table';
import FoodsContext from '../contexts/foods-context';

const MealPage: FC<{ location: Location }> = ({ location }) => {
  const sharedString = location.search;
  const foods = useContext(FoodsContext);
  const initialId = Number(location?.hash?.replace('#', '') ?? 0);
  const [id, setId] = useState(initialId);
  const { account = SHAPE_ACCOUNT } = useContext(AccountContext);
  let meal = MEAL;
  let mealData = MEAL_DATA;

  if (sharedString) {
    mealData = MealService.unFormatToShare(sharedString);
    meal = MealService.format({ mealData, foods });
  } else {
    meal = account.meals.find(({ id: mealId }) => mealId === id) ?? MEAL;
    mealData = MealService.unFormat(meal);
  }

  function handleShare() {
    const toShare = MealService.formatToShare(mealData);
    const url = `${location.origin}/meal?${toShare}` ?? '';
    const title = mealData.name || 'Receita';

    navigator.share({
      title,
      text: title,
      url,
    });
  }

  return (
    <Layout currentPage={CurrentPage.MEAL} showHeader={false}>
      <Grid container spacing={4}>
        <IconButton onClick={handleShare}>
          <ShareIcon />
        </IconButton>
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
