import React from "react";
import { graphql } from 'gatsby';
import Img from 'gatsby-image'
import styles from "../../styles/modules/fullimage.module.scss";

export const fragment = graphql`
  fragment AcfFullimageBlock on WPGraphQL_AcfFullimageBlock {
    acf {      
      full_width_image {
        description
        sourceUrl        
        imageFile {
          childImageSharp {
            fluid(quality: 100, maxWidth: 3840) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }        
    }     
  }
`;


const FullimageBlock = ({acf}) => {

  return (

    <>
    
      <Img
        className={styles.fullwidthimage}
        fluid={acf.full_width_image.imageFile.childImageSharp.fluid}
      />

      <p className={styles.description} dangerouslySetInnerHTML={{
        __html: acf.full_width_image.description,
        }}
      />

    </>

  );
                
};

export default FullimageBlock;