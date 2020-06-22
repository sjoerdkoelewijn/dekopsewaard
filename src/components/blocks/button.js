import React from "react";
import { graphql, Link } from 'gatsby';
import styles from "../../styles/modules/button.module.scss";

export const fragment = graphql`
  fragment AcfButtonBlock on WPGraphQL_AcfButtonBlock {
    acf {
      call_to_action
      btn_style_toggle
      url
      url_type
    }    
  }
`;


const ButtonBlock = ({acf}) => {
        
    const urlType = acf.url_type;

    const buttonStyle = acf.btn_style_toggle
      let style;

      if (buttonStyle === 'text_btn') {
        style=styles.text_button
      } else if (buttonStyle === 'full_btn_orange') {
        style=styles.orange_button
      } else if (buttonStyle === 'full_btn_blue') {
        style=styles.blue_button
      } else if (buttonStyle === 'outline_btn') {
        style=styles.ghost_button
      } 

    switch (urlType) {
      case 'internal' :
        return (
          <Link to={acf.url} className={style}>
            {acf.call_to_action}
          </Link>
        );

      case 'external':
        return (
          <a href={acf.url}>
            {acf.call_to_action}
          </a>  
        );

      default :
        return <p>geen url type gekozen</p>;  
    }     
                
};

export default ButtonBlock;