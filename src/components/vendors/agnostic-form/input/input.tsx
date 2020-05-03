import React from 'react';
import InputCore from './input-core';
import FormConnector from '../use-form/form-connector';

function Field(props) {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => <InputCore {...connectorProps} />}
    />
  );
}

export default Field;
