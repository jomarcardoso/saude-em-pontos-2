import React from 'react';
import RadioCore from './radio-core';
import FormConnector from '../use-form/form-connector';

function Radio(props) {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => (
        <RadioCore render={props.render} {...connectorProps} />
      )}
    />
  );
}

export default Radio;
