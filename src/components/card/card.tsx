import React, { FC } from 'react';
import CardMUI, { CardProps } from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { borderPrimary } from '../layout/layout';

const useStyles = makeStyles({
  root: {
    ...borderPrimary,
  },
});

const Card: FC<CardProps> = ({ children = '', className, ...props }) => {
  const classes = useStyles();

  return (
    <CardMUI
      {...props}
      variant="outlined"
      className={`${classes.root} ${className}`}
    >
      {children}
    </CardMUI>
  );
};

export default Card;
