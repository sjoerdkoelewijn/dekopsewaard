import React from "react";
import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment CoreEmbedYoutubeBlock on WPGraphQL_CoreEmbedYoutubeBlock {
    attributes {
      ... on WPGraphQL_CoreEmbedYoutubeBlockAttributes {
        url       
      }             
    }    
  }
`;


const EmbedYoutubeBlock = ({attributes}) => {

 
    return (
  <>    
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
      

</>
              
)};

export default EmbedYoutubeBlock;