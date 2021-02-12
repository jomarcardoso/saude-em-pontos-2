import React, { HTMLAttributes, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
  },
}));

const Image = (props: HTMLAttributes<HTMLImageElement>): ReactElement => {
  const classes = useStyles();

  return <img {...props} className={classes.image} alt="" />;
};

export default Image;
