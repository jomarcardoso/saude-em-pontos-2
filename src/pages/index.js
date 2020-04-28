import React, { useState, useEffect } from 'react'
import AccountService from '../services/account.service';
import Quiz from '../components/quiz';
import { Link } from "gatsby-theme-material-ui";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout';
import Main from '../components/main';
import Advertise from '../components/advertise';
import * as serviceWorker from '../serviceWorker';

function Index() {
  const [account, setAccount] = useState(AccountService.get());
  const [readAdvertise, setReadAdvertise] = useState(false);
  const rendered = typeof window !== 'undefined';

  function updateAccountUser(user) {
    setAccount({
      ...account,
      user
    });
  }

  useEffect(() => {
    AccountService.save(account);
  }, [account]);

  useEffect(() => {
    if (rendered) {
      serviceWorker.register();
    }
  }, []);

  if (rendered && !account) {
    if (!readAdvertise) {
      return (
        <Layout showFooter={false} showHeader={false}>
          <Advertise />
          <Typography>
            <Button onClick={() => setReadAdvertise(true)}>Avançar</Button>
          </Typography>
        </Layout>
      );
    }

    return (
      <Layout showFooter={false} showHeader={false}>
        <Quiz updateAccountUser={updateAccountUser} />
        <Typography>
          <Link to="/menu">Tudo pronto</Link>
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout pageName="Menu" />
  )
}

export default Index;