import React from 'react';
import Quiz from '../components/quiz';
import Layout from '../components/layout';

const QuizPage: React.SFC = () => {
  return (
    <Layout pageName="Sobre você">
      <Quiz />
    </Layout>
  );
};

export default QuizPage;
