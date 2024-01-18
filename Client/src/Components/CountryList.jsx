// CountryList.js
import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { Link } from "react-router-dom";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

const CountryList = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const countries = data.countries;

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.code}>
            {country.name} - {country.code} -{" "}
            {/* Use Link component to navigate to details page */}
            <Link to={`/country/${country.code}`}>
              <button>Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
