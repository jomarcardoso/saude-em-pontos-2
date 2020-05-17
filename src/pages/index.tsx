import React, { useState, useContext } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Quiz from '../components/quiz';
import Layout from '../components/layout';
import Advertise from '../components/advertise';
import AccountContext from '../contexts/account-context';
import { Account, SHAPE_ACCOUNT } from '../services/account.service';
import { CurrentPage } from '../services/page.service';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TimeService from '../services/vendors/time.service';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Image from '../components/image';

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
      <Grid container spacing={3}>
        {account.meals.map((meal) => (
          <Grid item xs={6} sm={4}>
            <Card variant="outlined">
              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                color="textSecondary"
                title={TimeService.toLongSring(meal.date)}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {meal.portions.map((portion) => (
                        <Grid item xs={3}>
                          <Badge
                            badgeContent={portion.quantity}
                            color="secondary"
                          >
                            <Image
                              src={portion.food.image}
                              alt={portion.food.name}
                            />
                          </Badge>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    çlkjçalsdf
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;
