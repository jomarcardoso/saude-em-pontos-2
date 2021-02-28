import React, { FC, useState } from 'react';
import Box from '@material-ui/core/Box';
// @ts-expect-error instalação esquisita
// eslint-disable-next-line import/no-extraneous-dependencies
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import StyleContext, { Style } from '../../contexts/style';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import './layout.scss';

import { CurrentPage } from '../../services/page.service';

const primary = {
  light: '#9c786c',
  main: '#6d4c41',
  dark: '#40241a',
};

function theme({ bgBody = '' }: Style) {
  return createMuiTheme({
    palette: {
      primary,
      secondary: {
        main: '#444',
      },
      action: {
        active: '#0097a7',
      },
      // divider: '#d6d6d6',
      // grey: {
      //   '800': '#f4f4f4',
      //   '700': '#f1f1f1',
      //   '600': '#e4e4e4',
      //   '400': '#c9c9c9',
      // },
      background: {
        default: bgBody || '#f8f8f8',
        // paper: '#D7D6D6',
        // paper: '#BEB2C8',
      },
      // type: 'dark',
      text: {
        primary: '#383838',
        secondary: '#383838',
      },
      // success: {
      //   main: '#4d7a60',
      // },
      // warning: {
      //   main: '#7a794d',
      // },
      // error: {
      //   main: '#7a4d4d',
      // },
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      h1: {
        fontSize: '24px',
        fontWeight: 600,
        textTransform: 'uppercase',
        color: primary.main,
        letterSpacing: 1,
      },
      h2: {
        fontSize: '20px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
      h3: {
        letterSpacing: 1,
        color: primary.main,
        fontSize: '20px',
        fontWeight: 600,
        textTransform: 'capitalize',
      },
      h4: {
        fontSize: '20px',
        fontWeight: 500,
      },
    },
  });
}

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

const Layout: FC<Props> = ({
  children,
  pageName = '',
  showHeader = true,
  showFooter = true,
  currentPage = CurrentPage.NONE,
}) => {
  const classes = useStyles();
  const [style, setStyle] = useState<Style>({});

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      <ThemeTopLayout theme={theme(style)}>
        <Box className={classes.root} bgcolor="gray.700">
          {showHeader && <Header pageName={pageName} />}
          <Main className={classes.main}>{children}</Main>
          {showFooter && <Footer currentPage={currentPage} />}
        </Box>
      </ThemeTopLayout>
    </StyleContext.Provider>
  );
};

export default Layout;
