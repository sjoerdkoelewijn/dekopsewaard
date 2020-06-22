import React from 'react';
import { graphql } from 'gatsby';
import InspraakForm from '../inspraakForm';

export const fragment = graphql`
  fragment AcfFormBlock on WPGraphQL_AcfFormBlock {
    acf {
      form_selector
    } 
  }
`;

const formBlock = ({acf}) => {

  switch (acf.form_selector) {
    
    case 'inspraak' : 
      return (
        <InspraakForm />
      );

    case 'inschrijven' : 
      return (
        <p>
          Dit formulier bestaat nog niet.
        </p>
      );

    default :
      return <p>Formulier keuze error</p>;
      
  }  

};

export default formBlock;