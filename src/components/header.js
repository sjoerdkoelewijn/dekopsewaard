import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from 'gatsby';
import Burger from '../components/burger';
import OverlayMenu from './overlayMenu';
import Logo from "../components/logoKopseWaard";
import ChevronIcon from '../components/chevronIcon';
import styles from '../styles/modules/header.module.scss';
import { AnchorLink } from "gatsby-plugin-anchor-links";


const Header = () => {
  const data = useStaticQuery(graphql`
  query getMenu {
    wordPress {
      menuItems(where: {location: MAIN_NAVIGATION}) {
        edges {
          node {
            url
            label
            cssClasses
            childItems {
              edges {
                node {
                  url
                  label
                  cssClasses
                }
              }
            }            
          }
        }
      }
    }
  }
  `)

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleOverlayMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return(

    <>

    <OverlayMenu menuOpen={menuOpen} callback={handleOverlayMenu} />

    <header className={styles.header}>

      <nav className={styles.mainnav}>

        {data.wordPress.menuItems.edges.map(item => {

          const wpurl = `https://dekopsewaard.nl` 
          const onlyPath = item.node.url.replace(wpurl, ``)

            return (
              
              <>
                
                {item.node.childItems.edges.length !== 0 ?

                  <>
                  
                    <div className={[item.node.cssClasses, styles.link, styles.link_with_submenu].join(' ')}>
                        
                        <Link key={item.node.id} aria-label={item.node.label} to={`/${onlyPath}/`} className={[item.node.cssClasses, styles.link].join(' ')}>
                            {item.node.label}
                            <span className={styles.ChevronIcon}>
                              <ChevronIcon />
                            </span>
                        </Link>
                                           
                        <div className={styles.submenu}>

                          {item.node.childItems.edges.map(subitem => {
                            return (

                              <AnchorLink key={subitem.node.id} aria-label={subitem.node.label} to={subitem.node.url} className={[subitem.node.cssClasses, styles.link].join(' ')}>
                                {subitem.node.label}
                              </AnchorLink>

                            )
                            
                          })}

                        </div>

                   </div>    

                  </>

                  :

                    <>

                        {item.node.cssClasses.includes('button') ?
                          <Link key={item.node.id} aria-label={item.node.label} to={`/${onlyPath}/`} className={[styles.button, styles.link].join(' ')}>
                            {item.node.label}
                          </Link>
                        :
                          <Link key={item.node.id} aria-label={item.node.label} to={`/${onlyPath}/`} className={[item.node.cssClasses, styles.link].join(' ')}>
                            {item.node.label}
                          </Link>
                        }
                      
                    </>   

                }                
                
              </>

            )
        })}

      </nav>

      <Burger handleOverlayMenu={handleOverlayMenu} />
      
    </header>

    <Link aria-label="Terug naar de homepage" to="/" className={styles.logo}>
      <Logo />
    </Link>

    </>

  )
}

export default Header
