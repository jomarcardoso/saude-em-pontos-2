import React from 'react';
import Layout from '../components/layout/layout';
import TimeService from '../services/vendors/time.service';

export default function Meal({ location: { state: meal } }) {
  return (
    <Layout pageName="Refeição">{TimeService.toLongSring(meal.date)}</Layout>
  );
}
