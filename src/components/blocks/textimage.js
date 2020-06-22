import React from 'react';
import { graphql, Link } from 'gatsby';
import styles from '../../styles/modules/textimage.module.scss';
import BackgroundImage from 'gatsby-background-image';
import Carousel from '@brainhubeu/react-carousel';
import '../../styles/carousel/Carousel-textimage.scss';

export const fragment = graphql`
  fragment AcfTextimageBlock on WPGraphQL_AcfTextimageBlock {
    acf {
      nummer
      header
      text_content
      align_toggle
      link_text
      link_url
      image_text_toggle      
      image_slider {
        image {
          title
          description
          sourceUrl
          imageFile {
            childImageSharp {
              fluid(quality: 100, maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
      
    } 
  }
`;


const ParagraphBlock = ({acf}) => {

  const alignToggle = acf.align_toggle;

  const headerLowercase = acf.header.toLowerCase();
  const headerNoAmp = headerLowercase.replace(/& /g, '');
  const anchor = headerNoAmp.replace(/ /g, '');


  // This is the image slider which in re-used twice below.
  const Slideitem = ({value}) => (
  
      <BackgroundImage 
        Tag="div"
        className={styles.slider_image}
        fluid={value.image.imageFile.childImageSharp.fluid}
        backgroundColor={`#D9E5F1`}
      >

        {acf.image_text_toggle === 'show_text' &&
    
          <div className={styles.image_desc_wrap}>
    
            <h3 dangerouslySetInnerHTML={{
              __html: value.image.title,
              }}
            />            
    
            <p dangerouslySetInnerHTML={{
              __html: value.image.description,
              }}
            />
    
          </div>
    
        }

      </BackgroundImage>    
  
    
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

              {acf.link_text &&
                <Link className={styles.text_button} to={acf.link_url}>
                  {acf.link_text}
                </Link>
              }  
              
            </div>

            {acf.image_slider.length > 1 ? // if 
            
            <Carousel 
            infinite
            dots
            //arrows
            className={styles.carousel}>
              
              {acf.image_slider.map(slideitem => (
                              
                <Slideitem value={slideitem}/>  
                              
              ))}

            </Carousel>

            : // else 

              <>

                {acf.image_slider.map(slideitem => (
                                  
                  <Slideitem value={slideitem}/>  
                                
                ))}

              </>    

            }

          </article>
        );

      case 'links': // Waar staat het plaatje?
        return (
          <article id={anchor} className={styles.text_image_block}>

            {acf.image_slider.length > 1 ? // if 
            
              <Carousel 
              infinite
              dots
              //arrows
              className={styles.carousel}>
                
                {acf.image_slider.map(slideitem => (
                                
                  <Slideitem value={slideitem}/>  
                                
                ))}

              </Carousel>

              : // else 

                <>

                  {acf.image_slider.map(slideitem => (
                                    
                    <Slideitem value={slideitem}/>  
                                  
                  ))}

                </>    

            }

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

          </article>
        );

      default :
        return <p>geen block style gekozen</p>;  
    }     
 
};

export default ParagraphBlock;