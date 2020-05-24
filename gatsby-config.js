module.exports = {
  siteMetadata: {
    title: `Saúde em pontos`,
    description: `Sua saúde em níveis altos`,
    author: `@jomarcardoso`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-flow`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          globPatterns: ['**/*'],
        },
        precachePages: [`/src/*`],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-react-svg',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `db`,
        path: `${__dirname}/src/db`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `SAÚDE EM PONTOS`,
        short_name: `Saúde em Pontos`,
        start_url: `/`,
        background_color: `#f2f7e9`,
        theme_color: `#4d7a60`,
        display: `standalone`,
        icon: `src/images/original.png`,
        cache_busting_mode: 'none',
      },
    },
  ],
};
