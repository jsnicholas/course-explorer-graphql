import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';


// Apollo client libraries
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

// create new client instance
const client = new ApolloClient({
  // GraphQL server endpoint
  uri: "http://localhost:4000",
  // enable caching to store query results, prevent unnecessary network reqs
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    < ApolloProvider client={client} >
      <GlobalStyles />
      <Pages />
    </ApolloProvider >
  </React.StrictMode>,
  document.getElementById('root')
);
