import React from 'react';
import InputNumberCore, {
  InputNumberProps as InputNumberCoreProps,
} from './input-number-core';
import FormConnector, { FormConnectorProps } from '../form/form-connector';

export type InputNumberProps = InputNumberCoreProps & FormConnectorProps;

const InputNumber: React.SFC<InputNumberProps> = (props) => {
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
