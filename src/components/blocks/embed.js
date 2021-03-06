import React from "react";
import { graphql } from 'gatsby';
import styles from '../../styles/modules/embed.module.scss';

export const fragment = graphql`
  fragment CoreEmbedBlock on WPGraphQL_CoreEmbedBlock {
    attributes {
      ... on WPGraphQL_CoreEmbedBlockAttributes {
        url
        caption       
      }             
    }    
  }
`;


const EmbedBlock = ({attributes}) => {

 
    return (

      <div className={styles.iframe_wrap}>  

        <iframe 
          width="800" 
          height="450"
          title={attributes.caption}        
          src="https://www.youtube.com/embed/LikwkUoDiVc" 
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        >
        </iframe>            
      
      </div>
              
)};

export default EmbedBlock;