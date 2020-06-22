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

      <div className={styles.file_wrap}>

        <div className={styles.documenten}>

          <h3>Documenten</h3>

          {acf.documenten.map(download => {
            
            return (
              <a rel="noreferrer" target="_blank" href={download.doc_download.sourceUrl}>{download.doc_titel}</a>
            )

          })}
      
        </div>

      </div>

    </article>  
  )
                
};

export default DownloadsBlock;