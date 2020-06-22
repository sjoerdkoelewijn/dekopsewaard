import React from "react";
import { graphql } from 'gatsby';
import NieuwsItems from "../NieuwsItems";

export const fragment = graphql`
  fragment AcfLatestpostBlock on WPGraphQL_AcfLatestpostBlock {
    acf {
      post_type
      post_amount
    }     
  }
`;

const LatestpostBlock = ({acf}) => {
        
    const postToggle = acf.post_type;

    switch (postToggle) {
      case 'post' :

        return (

          <div>Er zijn nog geen posts</div>

        );  

      case 'nieuws':

        return (

          <NieuwsItems />
        
        );          
        
      default :
        return <p>geen post type gekozen</p>;  
    }     
                
};

export default LatestpostBlock;