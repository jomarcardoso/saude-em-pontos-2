module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          globPatterns: ['**/*']
        },
        appendScript: `src/sw.js`,
        precachePages: [`/src/*`],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
        background_color: `#37a968`,
        theme_color: `#4d7a60`,
        display: `standalone`,
        icon: `src/images/original.png`,
        cache_busting_mode: 'none'
      },
    },
  ],
}
