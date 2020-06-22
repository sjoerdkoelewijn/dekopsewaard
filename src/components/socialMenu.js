import React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import TwitterIcon from "../components/twitterIcon";
import InstagramIcon from "../components/instagramIcon";
import YoutubeIcon from "../components/youtubeIcon";
import FacebookIcon from "../components/facebookIcon";
import styles from "../styles/modules/socialMenu.module.scss";

const SocialMenu = () => {
    const data = useStaticQuery(graphql`
    query getSocialMenu{
        wordPress {
            menuItems(where: {location: SOCIAL_MENU}) {
                edges {
                    node {
                        url
                        label
                    }
                }
            }  
        }
    }

    `)
    return(

        <nav className={styles.socialnav}>

            {data.wordPress.menuItems.edges.map(menuItem => {

                const socialplatform = menuItem.node.label.toLowerCase()
                let platform;

                if (socialplatform === "twitter") {
                    platform=<TwitterIcon />
                } else if (socialplatform === "facebook") {
                    platform=<FacebookIcon />
                } else if (socialplatform === "instagram") {
                    platform=<InstagramIcon />
                } else if (socialplatform === "youtube") {
                    platform=<YoutubeIcon />
            }

                return (
                    
                <a aria-label={menuItem.node.label} href={menuItem.node.url} className={styles.link}>
                    {platform}
                </a>
                    
                )
            })}

        </nav>
    

    )
}


export default SocialMenu 