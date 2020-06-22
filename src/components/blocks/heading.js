import React from "react";
import { graphql } from 'gatsby';

export const fragment = graphql`
  fragment CoreHeadingBlock on WPGraphQL_CoreHeadingBlock {
    saveContent
  }
`;

const HeadingBlock = ({saveContent}) => {

    return (

    <span dangerouslySetInnerHTML={{
      __html: saveContent,
      }}
    />
        
                
)};

export default HeadingBlock;