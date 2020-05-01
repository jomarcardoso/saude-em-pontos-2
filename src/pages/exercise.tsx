import React from 'react';
import Layout from '../components/layout';
import { CurrentPage } from '../services/account.service';

export default function Exercise() {
  return (
    <Layout currentPage={CurrentPage.EXERCISE}>
      Cadastrar exercício
    </Layout>
  )
}