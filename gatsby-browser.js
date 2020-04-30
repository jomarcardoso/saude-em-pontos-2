import React from 'react';
import Page from './src/components/page';

export const wrapRootElement = ({ element }) => {
  return (
    <Page>
      {element}
    </Page>
  )
}

export const registerServiceWorker = () => true
