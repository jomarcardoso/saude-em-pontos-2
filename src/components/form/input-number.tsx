import React from 'react';
import TextField from '@material-ui/core/TextField';
import AgnosticInputNumber from '../vendors/agnostic-components/form/input-number';

const InputNumber: React.SFC = (props) => {
  return (
    <AgnosticInputNumber
      {...props}
      render={(agnosticProps) => <TextField {...agnosticProps} />}
    />
  );
};

export default InputNumber;
