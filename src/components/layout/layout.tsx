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

function theme({ bgBody = '' }: Style) {
  return createMuiTheme({
    palette: {
      secondary: {
        main: '#666',
        // main: '#c95a1a',
      },
      action: {
        // main: '#BEB2C8',
        // main: '#c95a1a',
        active: '#c95a1a',
      },
      divider: '#d6d6d6',
      grey: {
        '800': '#f4f4f4',
        '700': '#f1f1f1',
        '600': '#e4e4e4',
        '400': '#c9c9c9',
      },
      primary: {
        main: '#4d7a60',
      },
      background: {
        default: bgBody || '#f8f8f8',
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
