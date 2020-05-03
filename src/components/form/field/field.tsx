import React from 'react';
import FieldCore from './field-core';
import FormConnector from '../with-form/form-connector';

function Field(props) {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => <FieldCore {...connectorProps} />}
    />
  );
}

export default Field;
