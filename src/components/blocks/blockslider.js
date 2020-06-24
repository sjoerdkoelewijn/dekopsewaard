import React from 'react';
import { graphql } from 'gatsby';
import styles from '../../styles/modules/blockslider.module.scss';
import BackgroundImage from 'gatsby-background-image';
import Carousel from '@brainhubeu/react-carousel';
import '../../styles/carousel/Carousel-blockslider.scss';

export const fragment = graphql`
  fragment AcfBlocksliderBlock on WPGraphQL_AcfBlocksliderBlock {
    acf {
      nummer
      header
      text_content
      bs_align_toggle
      image {
        sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
      }
      block_slider {
        button_link
        button_text
        excerpt
        titel
        bullet_points {
          list_item
        }
        block_slider_image {
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 960) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }            
    } 
  }
`;


const BlocksliderBlock = ({acf}) => {

  const alignToggle = acf.bs_align_toggle;

  const headerLowercase = acf.header.toLowerCase();
  const headerNoAmp = headerLowercase.replace(/& /g, '');
  const anchor = headerNoAmp.replace(/ /g, '');


  // This is the image slider which in re-used twice below.
  const Slideitems = () => (
  
    <Carousel         
    clickToChange
    slidesPerPage={3}
    breakpoints={{
      1600: {
        slidesPerPage: 2
      },
      800: {
        slidesPerPage: 1,
        arrows: true
      }
    }}
    className={styles.block_slide_carousel}>
      
      {acf.block_slider.map(blockslide => (
                      
        <div className={styles.slide_block}>

          <BackgroundImage 
            Tag="div"
            className={styles.block_slider_image}
            fluid={blockslide.block_slider_image.imageFile.childImageSharp.fluid}
            backgroundColor={`#D9E5F1`}
          />
          
          <h3 className={styles.titel} dangerouslySetInnerHTML={{
            __html: blockslide.titel,
            }}
          />
          <p className={styles.excerpt} dangerouslySetInnerHTML={{
            __html: blockslide.excerpt,
            }}
          />

          {blockslide.bullet_points && 
            <ul className={styles.list}>
              {blockslide.bullet_points.map(item => (
                <>
                  <li>
                    {item.list_item}
                  </li>
                </>
              ))}
            </ul>
          }            

        </div>
                      
      ))}

    </Carousel>   
    
  )

    switch (alignToggle) {
      case 'rechts' : // Waar staat het plaatje? Rechts = default
        return (

          <article id={anchor} className={styles.text_image_block}>

            <div className={styles.text_wrap}>

              {acf.nummer &&
                <p className={styles.nummer}>
                  0{acf.nummer}
                </p>
              }             

              <h2 className={styles.header} dangerouslySetInnerHTML={{
                __html: acf.header,
                }}
              /> 
              
              <p className={styles.text_content} dangerouslySetInnerHTML={{
                __html: acf.text_content,
                }}
              />

              
            </div>

            <BackgroundImage 
              Tag="div"
              className={styles.main_image}
              fluid={acf.image.imageFile.childImageSharp.fluid}
              backgroundColor={`#D9E5F1`}
            />

          </article>
        );

      case 'links': // Waar staat het plaatje?
        return (

          <>
          
          <article id={anchor} className={styles.text_image_block}>

            <BackgroundImage 
              Tag="div"
              className={styles.main_image}
              fluid={acf.image.imageFile.childImageSharp.fluid}
              backgroundColor={`#D9E5F1`}
            />

            <div className={styles.text_wrap}>

              {acf.nummer &&
                <p className={styles.nummer}>
                  0{acf.nummer}
                </p>
              }

              <h2 className={styles.header} dangerouslySetInnerHTML={{
                __html: acf.header,
                }}
              />            

              <p className={styles.text_content} dangerouslySetInnerHTML={{
                __html: acf.text_content,
                }}
              />
               

            </div>

            <BackgroundImage 
              Tag="div"
              className={styles.mobile_image}
              fluid={acf.image.imageFile.childImageSharp.fluid}
              backgroundColor={`#D9E5F1`}
            />

          </article>

          

          <Slideitems />

          </>

        );

      default :
        return <p>geen block style gekozen</p>;  
    }     
 
};

export default BlocksliderBlock;