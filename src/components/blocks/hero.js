import React from "react";
import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image'
import styles from "../../styles/modules/hero.module.scss";
import LogoElburg from "../logoElburg";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import ArrowDownIcon from "../arrowDownIcon";

export const fragment = graphql`
  fragment AcfHeroBlock on WPGraphQL_AcfHeroBlock {
    acf {
      header
      subheader
      style_toggle
      logo_toggle
      description
      page_menu {
        page_anchor
        page_link
      }
      image {
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


const HeroBlock = ({acf}) => {
        
    const styleToggle = acf.style_toggle;

    switch (styleToggle) {
      case 'normaal' :
        return (
          <article className={styles.hero_normaal}>

            <BackgroundImage 
              Tag="article"
              className={styles.heroimage}
              fluid={acf.image.imageFile.childImageSharp.fluid}
              backgroundColor={`#D9E5F1`}
            >
              
              <div className={styles.textwrap}>

                <h2 className={styles.subheader} dangerouslySetInnerHTML={{
                  __html: acf.subheader,
                  }}
                />

                <h1 className={styles.header} dangerouslySetInnerHTML={{
                  __html: acf.header,
                  }}
                />            

                <p className={styles.description} dangerouslySetInnerHTML={{
                  __html: acf.description,
                  }}
                />

                {acf.logo_toggle === 'elburg_logo' && 
                  
                  <LogoElburg />
                  
                }                

              </div>
            
            </BackgroundImage>  

          </article>
        );

      case 'minimaal':
        return (
          <article className={styles.hero_minimaal}>

            <BackgroundImage 
              Tag="article"
              className={styles.heroimage}
              fluid={acf.image.imageFile.childImageSharp.fluid}
              backgroundColor={`#D9E5F1`}
            >

              <div className={styles.textwrap}>

                <h1 className={styles.header} dangerouslySetInnerHTML={{
                  __html: acf.header,
                  }}
                />

                <h2 className={styles.subheader} dangerouslySetInnerHTML={{
                  __html: acf.subheader,
                  }}
                />            

              </div>

              {acf.page_menu &&

                <nav className={styles.page_menu}>

                  {acf.page_menu.map ((link, i) =>

                    <AnchorLink key={i} aria-label={link.page_anchor} to={link.page_link}>
                      {link.page_anchor}
                    </AnchorLink>

                  )}                  

                </nav>

              }

              <ArrowDownIcon />

            </BackgroundImage>

          </article>
        );

      default :
        return <p>geen block style gekozen</p>;  
    }     
                
};

export default HeroBlock;