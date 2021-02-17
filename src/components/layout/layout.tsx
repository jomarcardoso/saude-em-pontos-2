import React from 'react';
import Box from '@material-ui/core/Box';
// @ts-expect-error instalação esquisita
// eslint-disable-next-line import/no-extraneous-dependencies
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import './layout.scss';

import { CurrentPage } from '../../services/page.service';

const theme = createMuiTheme({
  palette: {
    secondary: {
      // main: '#BEB2C8',
      main: '#c95a1a',
    },
    divider: '#d6d6d6',
    grey: {
      '600': '#e6e6e6',
    },
    primary: {
      main: '#4d7a60',
    },
    background: {
      default: '#fdffff',
      // paper: '#D7D6D6',
      // paper: '#BEB2C8',
    },
    // type: 'dark',
    text: {
      primary: '#1D1E20',
      secondary: '#2D2E30',
    },
    success: {
      main: '#4d7a60',
    },
    warning: {
      main: '#7a794d',
    },
    error: {
      main: '#7a4d4d',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    h2: {
      fontSize: '22px',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    h3: {
      fontSize: '20px',
      fontWeight: 500,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 500,
    },
    h5: {
      fontSize: '16px',
      fontWeight: 500,
    },
    h6: {
      fontSize: '14px',
      fontWeight: 500,
    },
  },
});

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flex: 1,
  },
});

interface Props {
  pageName?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  currentPage?: CurrentPage;
}

const Layout: React.SFC<Props> = ({
  children,
  pageName = '',
  showHeader = true,
  showFooter = true,
  currentPage = CurrentPage.NONE,
}) => {
  const classes = useStyles();

  return (
    <ThemeTopLayout theme={theme}>
      <Box className={classes.root}>
        {showHeader && <Header pageName={pageName} />}
        <Main className={classes.main}>{children}</Main>
        {showFooter && <Footer currentPage={currentPage} />}
      </Box>
    </ThemeTopLayout>
  );
};

export default Layout;
