// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import CountryList from "./Components/CountryList";
import CountryDetails from "./Components/CountryDetails";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/country" element={<CountryList />} />
          {/* Use a dynamic parameter ":code" for the country code */}
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
