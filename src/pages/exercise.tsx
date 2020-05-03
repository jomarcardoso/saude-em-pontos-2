import React from 'react';
import Layout from '../components/layout';
import { CurrentPage } from '../services/page.service';

const ExercisePage: React.SFC = () => (
  <Layout currentPage={CurrentPage.EXERCISE}>Cadastrar exercício</Layout>
);

export default ExercisePage;
