import React from 'react';
import CheckboxCore from './checkbox-core';
import FormConnector from '../form/form-connector';

function Checkbox(props) {
  return (
    <FormConnector
      {...props}
      render={(connectorProps) => (
        <CheckboxCore render={props.render} {...connectorProps} />
      )}
    />
  );
}

export default Checkbox;
