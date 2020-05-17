import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
  },
}));

export default function Image(props) {
  const classes = useStyles();

  return <img className={classes.image} {...props} />;
}
