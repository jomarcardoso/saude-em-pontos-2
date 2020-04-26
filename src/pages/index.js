import React, { useState, useEffect } from 'react'
import Header from '../components/header';
import Advertise from '../components/advertise';
import AccountService from '../services/account.service';
import Quiz from '../components/quiz';
import { Link } from "gatsby-theme-material-ui";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout';

function Index() {
  const [account, setAccount] = useState(AccountService.get());
  const [readAdvertise, setReadAdvertise] = useState(false);

  function updateAccountUser(user) {
    setAccount({
      ...account,
      user
    });
  }

  useEffect(() => {
    AccountService.save(account);
  }, [account]);

  if (!account) {
    if (!readAdvertise) {
      return (
        <>
          <Advertise />
          <Typography>
            <Button onClick={() => setReadAdvertise(true)}>Avançar</Button>
          </Typography>
        </>
      );
    }

    return (
      <>
        <Quiz updateAccountUser={updateAccountUser} />
        <Typography>
          <Link to="/menu">Tudo pronto</Link>
        </Typography>
      </>
    );
  }

  return (
    <Layout pageName="Menu" />
  )
}

export default Index;