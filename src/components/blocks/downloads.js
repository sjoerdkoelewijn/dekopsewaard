import React from "react";
import { graphql } from 'gatsby';
import styles from '../../styles/modules/downloads.module.scss';
import Wave from "../wavePattern";
import PDFIcon from '../pdfIcon';


export const fragment = graphql`
  fragment AcfDownloadsBlock on WPGraphQL_AcfDownloadsBlock {
    acf {
      documenten {
        doc_download {
          mediaItemUrl
        }
        doc_titel
      }
      planning {
        plan_download {
          mediaItemUrl
        }
        plan_titel
      }
    }     
  }
`;

const DownloadsBlock = ({acf}) => {
        
  return (
    <article id="downloads" className={styles.downloads}>

      <h2 className={styles.header}>Downloads</h2>

      <div className={styles.file_wrap}>

        <div className={styles.documenten}>

          <h3 className={styles.subheader}>Documenten</h3>

            {acf.documenten.map(download => {
              
              return (
                <a className={styles.download_link} rel="noreferrer" title={download.doc_download.doc_titel} target="_blank" href={download.doc_download.mediaItemUrl}><PDFIcon /> {download.doc_titel}</a>
              )

            })}

        </div>

        <div className={styles.planning}>

          <h3 className={styles.subheader}>Planning</h3>

            {acf.planning.map(download => {
              
              return (
                <a className={styles.download_link} rel="noreferrer" title={download.plan_download.plan_titel} target="_blank" href={download.plan_download.mediaItemUrl}><PDFIcon /> {download.plan_titel}</a>
              )

            })}
      
        </div>

      </div>

      <div className={styles.wave}>
          <Wave />
      </div>

    </article>  
  )
                
};

export default DownloadsBlock;