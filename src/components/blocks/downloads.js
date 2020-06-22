import React from "react";
import { graphql } from 'gatsby';
import styles from '../../styles/modules/pages.module.scss';


export const fragment = graphql`
  fragment AcfDownloadsBlock on WPGraphQL_AcfDownloadsBlock {
    acf {
      documenten {
        doc_download {
          sourceUrl
          altText
        }
        doc_titel
      }
    }     
  }
`;

const DownloadsBlock = ({acf}) => {
        
  return (
    <article className={styles.downloads}>

      <h2>downloads</h2>

    </article>  
  )
                
};

export default DownloadsBlock;