import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Main from "./main"
import Footer from './footer';
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {

      primary: {
        main: '#4d7a60'
      }
      // type: 'dark',
    },
});

const Layout = ({ children, pageName='' }) => {
  return (
    <ThemeTopLayout theme={theme}>
      <Header pageName={pageName} />
      <Main>
        {children}
      </Main>
      <Footer />
    </ThemeTopLayout>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
