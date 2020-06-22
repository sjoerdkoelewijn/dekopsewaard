import React from "react";
import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment CoreQuoteBlock on WPGraphQL_CoreQuoteBlock {
    saveContent    
  }
`;


const QuoteBlock = ({saveContent}) => {

    return (

      <span dangerouslySetInnerHTML={{
        __html: saveContent,
        }}
      />
        
                
)};

export default QuoteBlock;