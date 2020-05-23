import React from 'react';
import TextField from '@material-ui/core/TextField';
import AgnosticInput from '../vendors/agnostic-components/form/input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const Input: React.SFC = (props) => {
  const classes = useStyles();

  return (
    <AgnosticInput
      {...props}
      render={(agnosticProps) => (
        <TextField classes={classes} {...agnosticProps} />
      )}
    />
  );
};

export default Input;
