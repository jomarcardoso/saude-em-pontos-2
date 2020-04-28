import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import Box from '@material-ui/core/Box';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'sticky',
    bottom: 0,
    overflow: 'hidden'
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();

  return (
    <Box borderTop={1} borderColor="text.secondary" component="footer" className={classes.root}>
      <BottomNavigation>
        <Link to="/">
          <BottomNavigationAction label="Início" icon={<HomeOutlinedIcon />} />
        </Link>
        <Link to="/meal">
          <BottomNavigationAction label="Cadastrar refeição" icon={<RestaurantOutlinedIcon />} />
        </Link>
        <Link to="/exercise">
          <BottomNavigationAction label="Cadastrar exercício" icon={<DirectionsRunOutlinedIcon />} />
        </Link>
      </BottomNavigation>
    </Box>
  );
}
