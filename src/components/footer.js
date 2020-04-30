import React from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';
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

export default function Footer({
  currentPage = 'home',
  account
}: {
  currentPage: currentPage
}) {
  const classes = useStyles();

  return (
    <Box borderTop={1} borderColor="text.secondary" component="footer" className={classes.root}>
      <BottomNavigation>
        <Link to="/">
          <BottomNavigationAction label="Início" icon={currentPage === 'home' ? <HomeIcon color="primary" /> : <HomeOutlinedIcon />} />
        </Link>
        <Link to="/meal" state={account}>
          <BottomNavigationAction label="Cadastrar refeição" icon={<RestaurantOutlinedIcon color={currentPage === 'meal' ? 'primary' : ''} />} />
        </Link>
        <Link to="/exercise">
          <BottomNavigationAction label="Cadastrar exercício" icon={<DirectionsRunOutlinedIcon color={currentPage === 'exercise' ? 'primary' : ''} />} />
        </Link>
      </BottomNavigation>
    </Box>
  );
}
