// CountryDetails.js
import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useParams } from "react-router-dom";

const GET_COUNTRY_DETAILS = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const CountryDetails = () => {
  const { code } = useParams();
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { code },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const country = data.country;

  return (
    <div>
      <h1>Details</h1>
      <h2>Name :{country.name} </h2>
      <p>Native: {country.native}</p>
      <p>Capital: {country.capital}</p>
      <p>Emoji: {country.emoji}</p>
      <p>Currency: {country.currency}</p>
      <p>Languages: {country.languages.map((lang) => lang.name).join(", ")}</p>
    </div>
  );
};

export default CountryDetails;
