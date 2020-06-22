import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import BackgroundImage from 'gatsby-background-image';
import NewsletterForm from '../components/newsletterForm';
import ParagraphBlock from "../components/blocks/paragraph";
import HeadingBlock from "../components/blocks/heading";
import KaartBlock from "../components/blocks/kaart";
import HeroBlock from "../components/blocks/hero";
import TextimageBlock from "../components/blocks/textimage";
import FullimageBlock from "../components/blocks/fullimage";
import NieuwsbriefBlock from "../components/blocks/nieuwsbrief";
import LatestpostBlock from "../components/blocks/latestposts";
import ButtonBlock from "../components/blocks/button";
import ImageBlock from "../components/blocks/imageBlock";
import EmbedYoutubeBlock from "../components/blocks/embedYoutube";
import QuoteBlock from "../components/blocks/quoteBlock";
import SEO from "../components/seo";
import ChevronIcon from "../components/chevronIcon";
import styles from '../styles/modules/pages.module.scss';


export const query = graphql`
  query getNieuws($id: ID!) {
    wordPress {
      nieuwsBy(id: $id) {
        id
        title
        date
        seo {
          title
          metaDesc
        }
        featuredImage {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        blocks {
          __typename         
          ...CoreHeadingBlock
          ...CoreParagraphBlock
          ...CoreImageBlock
          ...CoreQuoteBlock
          ...CoreEmbedYoutubeBlock
          ...AcfHeroBlock
          ...AcfTextimageBlock
          ...AcfKaartBlock
          ...AcfFullimageBlock
          ...AcfNieuwsbriefBlock
          ...AcfLatestpostBlock
          ...AcfButtonBlock
        }
      }
    }
  }
`;

const Nieuws = ({ data }) => {

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const unformatedDate = new Date(data.wordPress.nieuwsBy.date);
  const postDate = unformatedDate.toLocaleDateString('nl-NL', dateOptions );
  
  return (

    <Layout>
      <SEO title={data.wordPress.nieuwsBy.seo.title} description={data.wordPress.nieuwsBy.seo.metaDesc} />

      <>

      {data.wordPress.nieuwsBy.featuredImage &&

        <BackgroundImage 
          Tag="article"
          className={styles.header_image}
          fluid={data.wordPress.nieuwsBy.featuredImage.imageFile.childImageSharp.fluid}
          backgroundColor={`#D9E5F1`}
        />    

      }

        <div className={styles.breadcrumbtrail}> 

          <Link aria-label="Home" to="/" className={styles.link}>
            Home
          </Link>

          <ChevronIcon />  

          <Link aria-label="Nieuws" to="/nieuws" className={styles.link}>
            Nieuws
          </Link>

          <ChevronIcon />

          {data.wordPress.nieuwsBy.title &&  
            <div className={styles.current_page} dangerouslySetInnerHTML={{
                __html: data.wordPress.nieuwsBy.title,
            }}
            ></div>
          }

        </div>


        <div className={[styles.content, styles.with_sidebar].join(' ')}>

          <article className={styles.content_block}>         

            <h1 className={styles.heading} dangerouslySetInnerHTML={{
              __html: data.wordPress.nieuwsBy.title,
              }}
            />

            <div className={styles.date_wrap}>
              Geplaatst op {postDate}            
            </div>

            {data.wordPress.nieuwsBy.blocks &&

              <>
                
                {data.wordPress.nieuwsBy.blocks.map(block => {

                  const typeName = block.__typename;
                      
                  switch (typeName) {
                    case 'WPGraphQL_CoreHeadingBlock' :
                      return <span className={styles.CoreHeadingBlock}><HeadingBlock key={block.id} {...block} /></span>;

                    case 'WPGraphQL_CoreParagraphBlock':
                      return <span className={styles.CoreParagraphBlock}><ParagraphBlock key={block.id} {...block} /></span>;
                    
                    case 'WPGraphQL_CoreImageBlock' :
                      return <span className={styles.CoreImageBlock}><ImageBlock key={block.id} {...block} /></span>;

                    case 'WPGraphQL_CoreQuoteBlock':
                      return <span className={styles.CoreQuoteBlock}><QuoteBlock key={block.id} {...block} /></span>;
                    
                    case 'WPGraphQL_CoreEmbedYoutubeBlock' :
                      return <span className={styles.CoreEmbedYoutubeBlock}><EmbedYoutubeBlock key={block.id} {...block} /></span>;
          
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

                    case 'WPGraphQL_AcfLatestpostBlock':
                      return <span className={styles.AcfLatestpostBlock}><LatestpostBlock key={block.id} {...block} /></span>;

                    case 'WPGraphQL_AcfButtonBlock':
                      return <span className={styles.AcfButtonBlock}><ButtonBlock key={block.id} {...block} /></span>;  
                        
                    default :
                      return <p>Block moet nog aangemaakt worden in nieuwsItem.js</p>;  
                  }

                })}

              </>

            }

          </article>

          <aside className={styles.sidebar}>

            <div>

              <NewsletterForm />

            </div>

          </aside>

        </div>

      </>      


    </Layout>
  
  )
};

export default Nieuws;