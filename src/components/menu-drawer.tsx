import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Link } from 'gatsby-theme-material-ui';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CakeIcon from '@material-ui/icons/Cake';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  anchor: {
    display: 'inherit',
    justifyContent: 'inherit',
    alignItems: 'inherit',
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

interface Props {
  opened: boolean;
  toggleDrawer(boolean): void;
}

const MenuDrawer: React.SFC<Props> = ({ opened, toggleDrawer }) => {
  const classes = useStyles();

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component="li" button>
          <Link to="/advertise" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Esclarecimentos" />
          </Link>
        </ListItem>
        <ListItem component="li" button>
          <Link to="/quiz" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Sobre você" />
          </Link>
        </ListItem>
        <ListItem component="li" button>
          <Link to="/food" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <CakeIcon />
            </ListItemIcon>
            <ListItemText primary="Alimentos" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component="li" button>
          <Link to="/advertise" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Esclarecimentos" />
          </Link>
        </ListItem>
        <ListItem component="li" button>
          <Link to="/quiz" className={classes.anchor} color="inherit">
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Sobre você" />
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={opened} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
