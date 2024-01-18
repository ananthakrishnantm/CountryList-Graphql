import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors"; // Import cors middleware
import MySchema from "./Schema.js";

const port = 4000;

const app = express();

// Use cors middleware
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: MySchema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
