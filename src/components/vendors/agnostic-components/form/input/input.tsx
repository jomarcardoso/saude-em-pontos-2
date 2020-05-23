import React from 'react';
import InputCore from './input-core';
import FormConnector, { FormConnectorProps } from '../form/form-connector';

const Field: React.SFC<FormConnectorProps> = (props) => {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => (
        <InputCore render={props.render} {...connectorProps} />
      )}
    />
  );
};

export default Field;
