import React from 'react';
import { graphql } from 'gatsby';
import InspraakForm from '../inspraakForm';
import styles from '../../styles/modules/form.module.scss';

export const fragment = graphql`
  fragment AcfFormBlock on WPGraphQL_AcfFormBlock {
    acf {
      form_selector
      sidebar_notification
    } 
  }
`;

const formBlock = ({acf}) => {

  switch (acf.form_selector) {
    
    case 'inspraak' : 
      return (

        <div className={styles.form_wrap}>
          
          <div className={styles.form_inner}>
            <InspraakForm />
          </div>

          <div>

            <div className={styles.form_sidebar}>

              <div dangerouslySetInnerHTML={{
                __html: acf.sidebar_notification,
                }}
              />
              
            </div>
        
          </div>

        </div>       
        
      );

    case 'inschrijven' : 
      return (
        <p>
          Dit formulier bestaat nog niet.
        </p>
      );

    default :
      return <p>Formulier keuze error</p>;
      
  }  

};

export default formBlock;