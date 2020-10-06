require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `De Kopse Waard`,
    description: `Met zijn groene rustieke uitstraling vormt De Kopse Waard vanaf het water het visitekaartje voor de historische Vesting. Bekijk hier het nieuwe woon- en recreatiegebied dat de de gemeente Elburg ontwikkelt aan de Kop van het Havenkanaal.`,
    author: `@sjoerdkoelewijn`,
    siteUrl: `https://dekopsewaard.nl`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `google-map-react`,
    `gatsby-plugin-anchor-links`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },    
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wordPress`,
        url: `https://api.dekopsewaard.nl/graphql`,
        //url: `http://api.dekopsewaard.local/graphql`,
        refetchInterval: 30,
        batch: true,
      },
    },
    `gatsby-plugin-scroll-indicator`,
    {
      resolve: `gatsby-plugin-scroll-indicator`,
      options: {
        // Configure color of the scroll indicator
        color: '#F15410',
        // Configure paths where the scroll indicator will appear
        paths: [`/`, `/omgeving/`, `/ontwerp/`, `/nieuws/**`, `/inschrijven/`, `/reageren/`],
        // Configure the z-index of the indicator element
        zIndex: 9999,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-153606930-1",
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/omgeving/`, `/ontwerp/`, `/nieuws/**`, `/inschrijven/`, `/reageren/`],
      },
    },
    `gatsby-transformer-sharp`,
    `react-mailchimp-subscribe`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `kopsewaard`,
        short_name: `De Kopse Waard`,
        start_url: `/`,
        background_color: `#1F5C9D`,
        theme_color: `#1F5C9D`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Raleway\:100,200,300,300i,400,400i,600,700,900` 
        ],
        display: 'swap'
      }
    },  
  ],
}