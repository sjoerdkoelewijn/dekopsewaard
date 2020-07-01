import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: `https://api.dekopsewaard.nl/graphql`,
  fetch,
})

export const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>{element}</ApolloProvider>
  );