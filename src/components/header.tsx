import React, { useState, FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import MenuDrawer from './menu-drawer';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface Props {
  pageName: string;
}

const Header: FC<Props> = ({ pageName = '' }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const toggleDrawer = (open: boolean): void => {
    // if (
    //   event.type === 'keydown' &&
    //   (event.key === 'Tab' || event.key === 'Shift')
    // ) {
    //   return;
    // }

    setOpened(open);
  };

  return (
    <AppBar position="static" role="banner">
      <Container maxWidth="md" disableGutters>
        <Toolbar>
          <IconButton
            onClick={() => toggleDrawer(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" component="h1" className={classes.title}>
            {pageName}
          </Typography>
        </Toolbar>
      </Container>
      <MenuDrawer opened={opened} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
};

export default Header;
