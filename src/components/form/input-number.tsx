import React from 'react';
import TextField from '@material-ui/core/TextField';
import AgnosticInputNumber from '../vendors/agnostic-components/form/input-number';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const InputNumber: React.SFC = (props) => {
  const classes = useStyles();
  return (
    <AgnosticInputNumber
      {...props}
      render={(agnosticProps) => (
        <TextField classes={classes} {...agnosticProps} />
      )}
    />
  );
};

export default InputNumber;
