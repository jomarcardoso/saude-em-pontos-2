import React, { FC } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  input: {
    backgroundColor: '#f4f4f4',
  },
});

const InputFilled: FC<StandardTextFieldProps> = (props) => {
  const classes = useStyles();

  return (
    <TextField
      variant="filled"
      InputProps={{
        classes: {
          root: classes.input,
        },
      }}
      {...props}
    />
  );
};

export default InputFilled;
