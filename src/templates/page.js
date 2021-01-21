import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import BackgroundImage from 'gatsby-background-image';
import ParagraphBlock from "../components/blocks/paragraph";
import HeadingBlock from "../components/blocks/heading";
import KaartBlock from "../components/blocks/kaart";
import HeroBlock from "../components/blocks/hero";
import TextimageBlock from "../components/blocks/textimage";
import FullimageBlock from "../components/blocks/fullimage";
import NieuwsbriefBlock from "../components/blocks/nieuwsbrief";
import LatestpostBlock from "../components/blocks/latestposts";
import BlocksliderBlock from '../components/blocks/blockslider';
import NewsletterForm from '../components/newsletterForm';
import ImageBlock from "../components/blocks/imageBlock";
import EmbedYoutubeBlock from "../components/blocks/embedYoutube";
import QuoteBlock from "../components/blocks/quoteBlock";
import ButtonBlock from "../components/blocks/button";
import DownloadsBlock from "../components/blocks/downloads";
import styles from '../styles/modules/pages.module.scss';
import SEO from "../components/seo";

export const query = graphql`
  query getPage($id: ID!) {
    wordPress {
      pageBy(id: $id) {
        id
        title
        seo {
          title
          metaDesc
        }
        page_type {
          type
          sidebarSelector
          text
        }
        featuredImage {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 80, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        blocks {
          __typename
          ...CoreHeadingBlock
          ...CoreParagraphBlock
          ...AcfHeroBlock
          ...AcfTextimageBlock
          ...AcfKaartBlock
          ...AcfFullimageBlock
          ...AcfNieuwsbriefBlock
          ...AcfLatestpostBlock
          ...AcfBlocksliderBlock
          ...CoreImageBlock
          ...CoreQuoteBlock
          ...CoreEmbedYoutubeBlock
          ...AcfButtonBlock
          ...AcfDownloadsBlock
        }
      }
    }
  }
`;

const Page = ({data}) => {

  // These are the core gutenberg blocks.
  const GutenbergBlocks = () => (
  
    data.wordPress.pageBy.blocks.map(block => {
    
      const typeName = block.__typename;

      switch (typeName) {
        case 'WPGraphQL_CoreHeadingBlock' :
          return <span className={styles.CoreHeadingBlock}><HeadingBlock key={block.id} {...block} /></span>;
        
        case 'WPGraphQL_CoreParagraphBlock':
          return <span className={styles.CoreParagraphBlock}><ParagraphBlock key={block.id} {...block} /></span>;

        case 'WPGraphQL_AcfLatestpostBlock':
          return <span className={styles.AcfLatestpostBlock}><LatestpostBlock key={block.id} {...block} /></span>;  
          
        case 'WPGraphQL_AcfHeroBlock':
          return <span className={styles.AcfHeroBlock}><HeroBlock key={block.id} {...block} /></span>;

        case 'WPGraphQL_AcfTextimageBlock':
          return <span className={styles.AcfTextimageBlock}><TextimageBlock key={block.id} {...block} /></span>;  

        case 'WPGraphQL_AcfKaartBlock':
          return <span className={styles.AcfKaartBlock}><KaartBlock key={block.id} {...block} /></span>;
          
        case 'WPGraphQL_AcfFullimageBlock':
          return <span className={styles.AcfFullimageBlock}><FullimageBlock key={block.id} {...block} /></span>;

        case 'WPGraphQL_AcfNieuwsbriefBlock':
          return <span className={styles.AcfNieuwsbriefBlock}><NieuwsbriefBlock key={block.id} {...block} /></span>;
    
        case 'WPGraphQL_AcfBlocksliderBlock':
          return <span className="AcfBlocksliderBlock"><BlocksliderBlock key={block.id} {...block} /></span>;
          
          case 'WPGraphQL_CoreImageBlock' :
            return <span className={styles.CoreImageBlock}><ImageBlock key={block.id} {...block} /></span>;

          case 'WPGraphQL_CoreQuoteBlock':
            return <span className={styles.CoreQuoteBlock}><QuoteBlock key={block.id} {...block} /></span>;
          
          case 'WPGraphQL_CoreEmbedYoutubeBlock' :
            return <span className={styles.CoreEmbedYoutubeBlock}><EmbedYoutubeBlock key={block.id} {...block} /></span>; 
            
          case 'WPGraphQL_AcfButtonBlock':
            return <span className={styles.AcfButtonBlock}><ButtonBlock key={block.id} {...block} /></span>;

          case 'WPGraphQL_AcfDownloadsBlock':
            return <span className={styles.AcfDownloadsBlock}><DownloadsBlock key={block.id} {...block} /></span>;

            
        default :
          return <p>Dit block is niet geschikt voor dit type pagina.</p>;  
      }    

    })       
    
)

  switch (data.wordPress.pageBy.page_type.type) {
    case 'text' : // Dit zijn de simpele text pagina's

      switch (data.wordPress.pageBy.page_type.sidebarSelector) {
        case 'empty' :
          return (

            <Layout>
              <SEO title={data.wordPress.pageBy.seo.title} description={data.wordPress.pageBy.seo.metaDesc} />

              {data.wordPress.pageBy.featuredImage &&

                <BackgroundImage 
                  Tag="article"
                  className={styles.header_image}
                  fluid={data.wordPress.pageBy.featuredImage.imageFile.childImageSharp.fluid}
                  backgroundColor={`#D9E5F1`}
                />    

              }

              <div className={styles.content}>
      
                {data.wordPress.pageBy.blocks &&
      
                  <GutenbergBlocks />       
      
                }

              </div>
    
            </Layout>
    
          );

        case 'signup' :
              return(

                <Layout>

                  <SEO title={data.wordPress.pageBy.seo.title} description={data.wordPress.pageBy.seo.metaDesc} />
                  
                  {data.wordPress.pageBy.featuredImage && 

                    <BackgroundImage 
                      Tag="article"
                      className={styles.header_image}
                      fluid={data.wordPress.pageBy.featuredImage.imageFile.childImageSharp.fluid}
                      backgroundColor={`#D9E5F1`}
                    />

                  }

                  <div className={[styles.content, styles.with_sidebar].join(' ')}>
        
                    {data.wordPress.pageBy.blocks &&

                      <>
          
                        <article className={styles.content_block}>
                          
                          <GutenbergBlocks />  
            
                        </article>
                        
                        <aside className={styles.sidebar}>
      
                          <NewsletterForm />
      
                        </aside>

                      </>
          
                    }
    
                  </div>
        
                </Layout>

              );

        case 'text' :
          return(

            <Layout>
              <SEO title={data.wordPress.pageBy.seo.title} description={data.wordPress.pageBy.seo.metaDesc} />

              <BackgroundImage 
                Tag="article"
                className={styles.header_image}
                fluid={data.wordPress.pageBy.featuredImage.imageFile.childImageSharp.fluid}
                backgroundColor={`#D9E5F1`}
              />

              <div className={[styles.content, styles.with_sidebar].join(' ')}>
    
                {data.wordPress.pageBy.blocks &&

                  <>
      
                    <article className={styles.content_block}>
                      
                      <GutenbergBlocks />  
        
                    </article>
                  
                    <aside className={styles.sidebar}>

                      <div className="sidebar_text" dangerouslySetInnerHTML={{
                        __html: data.wordPress.pageBy.page_type.text,
                        }}
                      />

                    </aside>

                  </>
      
                }

              </div>
    
            </Layout>

          ); 
          
        default :
          return <p>Er is iets mis gegaan met de sidebar keuze.</p>;

      }

      

    case 'main' : // Dit zijn de mooie pagina's
      return (

        <Layout>
          <SEO title={data.wordPress.pageBy.seo.title} description={data.wordPress.pageBy.seo.metaDesc} />

          {data.wordPress.pageBy.blocks &&

            <>

              <GutenbergBlocks />

            </>        

          }

        </Layout>

      );  

    default :
      return <p>Er is iets mis gegaan met de pagina type keuze.</p>;  
  } 

}


export default Page
