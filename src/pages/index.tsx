import React, { useState, useContext } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Quiz from '../components/quiz';
import Layout from '../components/layout';
import Advertise from '../components/advertise';
import AccountContext from '../components/account-context';
import { Account, SHAPE_ACCOUNT } from '../services/account.service';
import { CurrentPage } from '../services/page.service';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TimeService from '../services/vendors/time.service';

const Index: React.SFC = () => {
  const {
    account = SHAPE_ACCOUNT,
  }: {
    account: Account;
  } = useContext(AccountContext);

  const [readAdvertise, setReadAdvertise] = useState(false);
  const rendered = typeof window !== 'undefined';
  const registeredUser = account.user.name;

  if (rendered && !registeredUser) {
    if (!readAdvertise) {
      return (
        <Layout showFooter={false} showHeader={false}>
          <Advertise />
          <Typography>
            <Button onClick={(): void => setReadAdvertise(true)}>
              Avançar
            </Button>
          </Typography>
        </Layout>
      );
    }

    return (
      <Layout showFooter={false} showHeader={false}>
        <Quiz />
        <Typography>
          <Link to="/menu">Tudo pronto</Link>
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout currentPage={CurrentPage.HOME} pageName="Menu">
      <Grid container spacing={4}>
        {account.meals.map((meal) => (
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                color="textSecondary"
                title={TimeService.toLongSring(meal.date)}
              />
              <CardContent>
                <List>
                  {/* {meal.portions.map((portion) => (
                  <ListItem key={portion.food}>
                    <ListItemIcon className={classes.selectIcon}>
                      <img className={classes.img} src={mage} alt="" />
                    </ListItemIcon>
                    <ListItemText primary={portion.food} />
                  </ListItem>
                ))} */}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;
