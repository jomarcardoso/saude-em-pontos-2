import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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

const Header: React.SFC<Props> = ({ pageName = '' }) => {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  const toggleDrawer = (open: boolean): void => (
    event: React.SyntheticEvent,
  ): void => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpened(open);
  };

  return (
    <AppBar position="static" role="header" className={classes.root}>
      <Toolbar>
        <IconButton
          onClick={toggleDrawer(true)}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {pageName}
        </Typography>
        <Button color="inherit">Login</Button>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
      <MenuDrawer opened={opened} toggleDrawer={toggleDrawer} />
    </AppBar>
  );
};

export default Header;
