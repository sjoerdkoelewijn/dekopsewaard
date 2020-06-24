import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import styles from "../styles/modules/overlaymenu.module.scss";

const OverlayMenu = ({ menuOpen, callback }) => {
    const data = useStaticQuery(graphql`
    query getMobileMenu{
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
    return(
        <>

        {menuOpen === true &&

            <div className={styles.menu__bg}>

                <nav className={styles.overlaynav}>                

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
                            </Link>
                                                
                            <div className={styles.submenu}>

                                {item.node.childItems.edges.map(subitem => {
                                return (

                                    <AnchorLink key={subitem.node.id} aria-label={subitem.node.label} to={subitem.node.url} className={[item.node.cssClasses, styles.link].join(' ')}>
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
                
                <div className={styles.menu_close_btn} role="button" aria-label="close" onClick={callback} tabIndex="0" onKeyDown={callback}>
                    
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
                    </svg>

                    <span>Close</span>

                </div>

            </div>

    }

    </>

    )
}


export default OverlayMenu 