import React from 'react';
import Radio from '@material-ui/core/Radio';
import AgnosticRadio from '../vendors/agnostic-components/form/radio';

const Input: React.SFC = (props) => (
  <AgnosticRadio
    {...props}
    render={(agnosticProps) => <Radio {...agnosticProps} />}
  />
);

export default Input;
