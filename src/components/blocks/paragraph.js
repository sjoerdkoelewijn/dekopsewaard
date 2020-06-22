import React from "react";
import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment CoreParagraphBlock on WPGraphQL_CoreParagraphBlock {
    saveContent    
  }
`;


const ParagraphBlock = ({saveContent}) => {

    return (

      <span dangerouslySetInnerHTML={{
        __html: saveContent,
        }}
      />
        
                
)};

export default ParagraphBlock;