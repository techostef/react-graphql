import React, { FunctionComponent } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "core-js/stable";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "@next/polyfill-module";
import "@next/polyfill-nomodule";

import { ProviderCollections } from '../src/features/collections/contexts/CollectionsContext';
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

interface IProps {
  Component: FunctionComponent;
  pageProps: Record<string, any>;
}

function App({ Component, pageProps }: IProps) {
  return (
    <ApolloProvider client={client}>
      <div id="root">
        <ProviderCollections>
          <Component {...pageProps} />
        </ProviderCollections>
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
