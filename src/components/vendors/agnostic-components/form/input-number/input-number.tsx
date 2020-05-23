import React from 'react';
import InputNumberCore from './input-number-core';
import FormConnector, { FormConnectorProps } from '../form/form-connector';

const InputNumber: React.SFC<FormConnectorProps> = (props) => {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => (
        <InputNumberCore render={props.render} {...connectorProps} />
      )}
    />
  );
};

export default InputNumber;
