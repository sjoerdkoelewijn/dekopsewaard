import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ParagraphBlock from "../components/blocks/paragraph";
import HeadingBlock from "../components/blocks/heading";
import KaartBlock from "../components/blocks/kaart";
import HeroBlock from "../components/blocks/hero";
import TextimageBlock from "../components/blocks/textimage";
import FullimageBlock from "../components/blocks/fullimage";
import NieuwsbriefBlock from "../components/blocks/nieuwsbrief";
import LatestpostBlock from "../components/blocks/latestposts";
import ButtonBlock from "../components/blocks/button";
import GooglemapBlock from "../components/blocks/googleMap";

import styles from '../styles/modules/pages.module.scss';

const IndexPage = ({ data }) => {
  
  return (

    <Layout>  
      <SEO title="De Kopse Waard in Elburg" description={data.wordPress.pageBy.seo.metaDesc} />

        {data.wordPress.pageBy.blocks &&

          <>
            
            {data.wordPress.pageBy.blocks.map(block => {

              const typeName = block.__typename;

              switch (typeName) {
                case 'WPGraphQL_CoreHeadingBlock' :
                  return <span className={styles.CoreHeadingBlock}><HeadingBlock key={block.id} {...block} /></span>;

                case 'WPGraphQL_CoreParagraphBlock':
                  return <span className={styles.CoreParagraphBlock}><ParagraphBlock key={block.id} {...block} /></span>;

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
                  
                case 'WPGraphQL_AcfGooglemapBlock':
                  return <span className={styles.AcfGooglemapBlock}><GooglemapBlock key={block.id} {...block} /></span>;  
                    
                default :
                  return <p>Dit block moet nog aangemaakt worden in index.js</p>;  
              }    

            })}  

          </>        

        }

      </Layout>
  
  )
};

export const query = graphql`
  query getIndex {
    wordPress {
      pageBy(id: "cGFnZToxNg==") {
        seo {
          metaDesc
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
          ...AcfButtonBlock
          ...AcfGooglemapBlock
        }
      }
    }
   
  }
`;

export default IndexPage;
