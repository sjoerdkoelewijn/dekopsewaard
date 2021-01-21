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
            fluid(quality: 80, maxWidth: 1920) {
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

    <div className={styles.fullwidthimage_wrap}>
    
      <Img
        className={styles.fullwidthimage}
        fluid={acf.full_width_image.imageFile.childImageSharp.fluid}
      />

      <p className={styles.description} dangerouslySetInnerHTML={{
        __html: acf.full_width_image.description,
        }}
      />

    </div>

  );
                
};

export default FullimageBlock;