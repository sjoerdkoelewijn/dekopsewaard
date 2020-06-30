import React from 'react';
import { graphql } from 'gatsby';
import styles from '../../styles/modules/nieuwsbrief.module.scss';
import NewsletterForm from '../newsletterForm';

export const fragment = graphql`
  fragment AcfNieuwsbriefBlock on WPGraphQL_AcfNieuwsbriefBlock {
    acf {
      header
      description
    } 
  }
`;


const nieuwsbriefBlock = ({acf}) => {

  return (

    <article className={styles.nieuwsbrief_block}>

      <div className={styles.text_wrap}>               

        <h2 className={styles.header} dangerouslySetInnerHTML={{
          __html: acf.header,
          }}
        />            

        <div className={styles.text_content} dangerouslySetInnerHTML={{
          __html: acf.description,
          }}
        />
        
      </div>

      <div className={styles.nieuwsbrief_form}> 

        <NewsletterForm />

      </div>
    
    </article>

  );
 
};

export default nieuwsbriefBlock;