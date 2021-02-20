import React, { FC, useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
import Image from '../components/image';
import Ingredients from '../components/ingredients/ingredients';

const useStyles = makeStyles({
  imageBanner: {
    padding: '30px',
  },
});

const MealPage: FC<{ location: Location }> = ({ location }) => {
  const sharedString = location.search;
  const foods = useContext(FoodsContext);
  const initialId = Number(location?.hash?.replace('#', '') ?? 0);
  const [id, setId] = useState(initialId);
  const { account = SHAPE_ACCOUNT } = useContext(AccountContext);
  let meal = MEAL;
  let mealData = MEAL_DATA;
  const [editing, setEditing] = useState(!id);
  const classes = useStyles();

  if (sharedString) {
    mealData = MealService.unFormatToShare(sharedString);
    meal = MealService.format({ mealData, foods });
  } else {
    meal = account.meals.find(({ id: mealId }) => mealId === id) ?? MEAL;
    mealData = MealService.unFormat(meal);
  }

  function handleShare() {
    const toShare = MealService.formatToShare(mealData);
    const url = `${location.origin}/meal/?${toShare}` ?? '';
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
        {!editing && (
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        )}
        {!editing ? (
          <>
            <Grid item>
              <Box
                bgcolor="white"
                className={classes.imageBanner}
                border={1}
                borderColor="grey.600"
                borderRadius={4}
              >
                <Grid container justify="center">
                  <Grid item xs={6}>
                    <Image src={meal.image} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Ingredients portions={meal.portions} />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <MealRegister
              mealData={mealData}
              meal={meal}
              setId={setId}
              editing={editing}
              setEditing={setEditing}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <ScoreComponent meal={meal} />
        </Grid>
        {!editing && (
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
        )}
      </Grid>
    </Layout>
  );
};

export default MealPage;
