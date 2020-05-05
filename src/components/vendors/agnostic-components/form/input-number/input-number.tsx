import React from 'react';
import InputNumberCore from './input-number-core';
import FormConnector from '../use-form/form-connector';

function InputNumber(props) {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => (
        <InputNumberCore render={props.render} {...connectorProps} />
      )}
    />
  );
}

export default InputNumber;
