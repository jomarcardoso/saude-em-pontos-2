import React from 'react';
import Layout from '../components/layout';
import { CurrentPage } from '../services/account.service';

const ExercisePage: React.SFC = () => {
  return (
    <Layout currentPage={CurrentPage.EXERCISE}>Cadastrar exercício</Layout>
  );
};

export default ExercisePage;
