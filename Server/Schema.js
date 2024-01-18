import graphql from "graphql";
import axios from "axios";

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } =
  graphql;

const UserType = new GraphQLObjectType({
  name: "Language",
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const CountryType = new GraphQLObjectType({
  name: "Country",
  fields: () => ({
    name: { type: GraphQLString },
    native: { type: GraphQLString },
    capital: { type: GraphQLString },
    emoji: { type: GraphQLString },
    currency: { type: GraphQLString },
    languages: { type: new GraphQLList(UserType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    country: {
      type: CountryType,
      args: { code: { type: GraphQLString } },
      resolve(parent, args) {
        const graphqlQuery = `
          query {
            country(code: "${args.code}") {
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

        const url = `https://countries.trevorblades.com/graphql?query=${encodeURIComponent(
          graphqlQuery
        )}`;

        return axios
          .get(url)
          .then((response) => response.data.data.country)
          .catch((error) => {
            console.error("Error fetching country data:", error.message);
            throw error;
          });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
