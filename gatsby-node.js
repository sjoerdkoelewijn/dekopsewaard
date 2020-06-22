const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const nieuwsItem = path.resolve(`./src/templates/nieuwsItem.js`)
  const pageItem = path.resolve(`./src/templates/page.js`)

  const result = await graphql(
    `
    {
      wordPress {
        nieuwsitems {
          edges {
            node {
              id
              slug              
            }
          }
        }
        pages {
          edges {
            node {
              id
              slug              
            }
          }
        }        
      }
    }
    `
  )
 
  if (result.errors) {
    throw result.errors
  } 


  result.data.wordPress.nieuwsitems.edges.map((nieuws) => {
    createPage({
      path: `/nieuws/${nieuws.node.slug}`,
      component: nieuwsItem,
      context: {
        id: nieuws.node.id,
      },
    })
  })


  result.data.wordPress.pages.edges.map((page) => {
    createPage({
      path: page.node.slug,
      component: pageItem,
      context: {
        id: page.node.id,
      },
    })
  })  

},


exports.createResolvers = async (
  {
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  },
) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    }
  })
}