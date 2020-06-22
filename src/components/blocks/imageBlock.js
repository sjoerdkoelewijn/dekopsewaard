import React from "react";
import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment CoreImageBlock on WPGraphQL_CoreImageBlock {
    saveContent    
  }
`;


const ImageBlock = ({saveContent}) => {

    return (

      <span dangerouslySetInnerHTML={{
        __html: saveContent,
        }}
      />
        
                
)};

export default ImageBlock;