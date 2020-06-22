import React from "react";
import { useStaticQuery, graphql } from 'gatsby';
import Logo from "./logoKopseWaard";
import LogoElburg from "./logoElburg";
import SocialMenu from "./socialMenu";
import Wave from "./wavePattern";
import styles from "../styles/modules/footer.module.scss";

const Footer = () => {
  const data = useStaticQuery(graphql`
  query getFooter{
      wordPress {
        optionsPage {
            optionsPage {
                contact
                footerLastline
            }
        }  
      }
  }

  `)
  return(

    <>

      <footer className={styles.footer}>

          <div className={styles.footer_wrap}>
          
              <div className={styles.logos}>

                  <div className={styles.footerlogo}>
                      <Logo />
                  </div>

                  <div className={styles.logoElburg}>
                      <LogoElburg />
                  </div>

              </div>
              
              <div className={styles.textwrap}>

                  <div className={styles.text} dangerouslySetInnerHTML={{
                      __html: data.wordPress.optionsPage.optionsPage.contact,
                      }}
                  />

                  <SocialMenu />                

              </div>

          </div>

          <div className={styles.wave}>
              <Wave />
          </div>
              
      </footer>

      <div className={styles.belowFooter}
          dangerouslySetInnerHTML={{
              __html: data.wordPress.optionsPage.optionsPage.footerLastline,
          }}
      ></div>

    </>  

  )
}


export default Footer 