import React from "react";
import { graphql } from 'gatsby';
import Img from "gatsby-image"
import styles from '../../styles/modules/kaart.module.scss';
import MultiplePopover from '../popover';

export const fragment = graphql`
  fragment AcfKaartBlock on WPGraphQL_AcfKaartBlock {
    acf {      
      info_block {
            description
            header
            icon_x
            icon_y
          }
      kaartImage {
        sourceUrl
        imageFile {
          childImageSharp {
            fixed(quality: 100, width: 1920, height: 1080) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }  
`;


const KaartBlock = ({acf}) => {
 
    return (
    
    <>    

      <div id="kaart" className={styles.ontwerp_map}>
        
        <MultiplePopover info={acf.info_block} />

        <Img
          className={styles.kaartImage} 
          fixed={acf.kaartImage.imageFile.childImageSharp.fixed} 
        />
     
      </div>   

    </>        
                
)};

export default KaartBlock;