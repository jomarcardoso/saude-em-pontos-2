import React from 'react';
import TextField from '@material-ui/core/TextField';
import AgnosticInput from '../vendors/agnostic-components/form/input';

const Input: React.SFC = (props) => (
  <AgnosticInput
    {...props}
    render={(agnosticProps) => <TextField {...agnosticProps} />}
  />
);

export default Input;
