import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();

  return (
    <BottomNavigation component="footer" className={classes.root}>
      <Link to="/">
        <BottomNavigationAction label="Início" icon={<HomeOutlinedIcon />} />
      </Link>
      <Link to="/food">
        <BottomNavigationAction label="Cadastrar alimento" icon={<RestaurantOutlinedIcon />} />
      </Link>
      <Link to="/exercise">
        <BottomNavigationAction label="Cadastrar exercício" icon={<DirectionsRunOutlinedIcon />} />
      </Link>
    </BottomNavigation>
  );
}
