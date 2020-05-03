import React from 'react';
import Box from '@material-ui/core/Box';
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Header from './header';
import Main from './main';
import Footer from './footer';

import { CurrentPage } from '../services/page.service';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4d7a60',
    },
    // type: 'dark',
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
