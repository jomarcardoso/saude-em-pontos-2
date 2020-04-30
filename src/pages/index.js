import React, { useState, useEffect, useContext } from 'react'
import Quiz from '../components/quiz';
import { Link } from "gatsby-theme-material-ui";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout';
import Advertise from '../components/advertise';
// import * as serviceWorker from '../serviceWorker';
import AccountContext from '../components/account-context';

function Index() {
  const { account, setAccount } = useContext(AccountContext);
  const [readAdvertise, setReadAdvertise] = useState(false);
  const rendered = typeof window !== 'undefined';

  // useEffect(() => {
  //   if (rendered) {
  //     serviceWorker.register();
  //   }
  // }, [rendered]);

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
        <Quiz setUser={setAccount.user} />
        <Typography>
          <Link to="/menu">Tudo pronto</Link>
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout pageName="Menu" account={account} setAccount={setAccount} />
  )
}

export default Index;