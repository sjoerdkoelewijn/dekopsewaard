import React from "react";
import { useStaticQuery, graphql, Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import styles from "../styles/modules/latestposts.module.scss";

const NieuwsItems = () => {
    const data = useStaticQuery(graphql`
    query getLatestNieuwsItems {
        wordPress{
            nieuwsitems {
                edges {
                    node {
                        excerpt
                        slug
                        title
                        date
                        featuredImage {
                            node {
                                sourceUrl
                                imageFile {
                                    childImageSharp {
                                        fluid(quality: 80, maxWidth: 960) {
                                            ...GatsbyImageSharpFluid_withWebp
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    `)

    return (

        <div className={styles.latestPosts}>
        
            {data.wordPress.nieuwsitems.edges.map(item => {

                const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const unformatedDate = new Date(item.node.date);
                const postDate = unformatedDate.toLocaleDateString('nl-NL', dateOptions );

                return (        
                        
                    <article className={styles.post}>

                        {item.node.featuredImage &&

                            <Link className={styles.image_wrap} to={['/nieuws/', item.node.slug].join('')}>

                                <BackgroundImage 
                                className={styles.image}
                                fluid={item.node.featuredImage.node.imageFile.childImageSharp.fluid}
                                backgroundColor={`#D9E5F1`}
                                />   

                            </Link>

                        }
                
                        <div className={styles.textwrap}>

                            <Link className={styles.link} to={['/nieuws/', item.node.slug].join('')} >

                                <h1 className={styles.header} dangerouslySetInnerHTML={{
                                    __html: item.node.title,
                                    }}
                                /> 

                            </Link>

                            <div className={styles.date_wrap}>
                              Geplaatst op {postDate}            
                            </div>
                    
                            <p className={styles.excerpt} dangerouslySetInnerHTML={{
                                __html: item.node.excerpt,
                                }}
                            />

                            <Link className={styles.cta} to={['/nieuws/', item.node.slug].join('')} >

                            <p className={styles.cta}>
                                Lees meer    
                            </p> 

                            </Link>
                
                        </div>           
                
                    </article>
                    
                )
        
            })} 

        </div>

    )

};

export default NieuwsItems;