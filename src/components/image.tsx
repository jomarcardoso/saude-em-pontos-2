import React, { FC, HTMLAttributes, HTMLProps, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    width: '100%',
  },
}));

const Image: FC<HTMLProps<HTMLImageElement>> = (props): ReactElement => {
  const classes = useStyles();

  return (
    <img
      {...(props as HTMLAttributes<HTMLImageElement>)}
      className={classes.image}
      alt=""
    />
  );
};

export default Image;
