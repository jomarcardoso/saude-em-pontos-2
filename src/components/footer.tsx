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
import { CurrentPage } from '../services/account.service';

const useStyles = makeStyles({
  root: {
    position: 'sticky',
    bottom: 0,
    overflow: 'hidden'
  },
});

interface Props {
  currentPage: CurrentPage;
}

const Footer: React.SFC<Props> = ({
  currentPage = CurrentPage.HOME,
  account
}) => {
  const classes = useStyles();

  return (
    <Box borderTop={1} borderColor="text.secondary" component="footer" className={classes.root}>
      <BottomNavigation>
        <Link to="/">
          <BottomNavigationAction label="Início" icon={currentPage === CurrentPage.HOME ? <HomeIcon color="primary" /> : <HomeOutlinedIcon />} />
        </Link>
        <Link to="/meal" state={account}>
          <BottomNavigationAction label="Cadastrar refeição" icon={<RestaurantOutlinedIcon color={currentPage === CurrentPage.MEAL ? 'primary' : ''} />} />
        </Link>
        <Link to="/exercise">
          <BottomNavigationAction label="Cadastrar exercício" icon={<DirectionsRunOutlinedIcon color={currentPage === CurrentPage.EXERCISE ? 'primary' : ''} />} />
        </Link>
      </BottomNavigation>
    </Box>
  );
}

export default Footer;