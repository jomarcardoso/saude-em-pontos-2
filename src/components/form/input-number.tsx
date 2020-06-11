import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import AgnosticInputNumber, {
  InputNumberProps as AgnosticInputNumberProps,
} from '../vendors/agnostic-components/form/input-number';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

type InputNumberProps = AgnosticInputNumberProps & TextFieldProps;

const InputNumber: React.SFC<InputNumberProps> = (props) => {
  const classes = useStyles();

  return (
    <AgnosticInputNumber
      {...props}
      render={(agnosticProps: TextFieldProps) => (
        <TextField classes={classes} {...agnosticProps} />
      )}
    />
  );
};

export default InputNumber;
