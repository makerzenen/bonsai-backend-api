import { ApolloServer } from "apollo-server"
import { ObjectId } from "mongodb"
import { connect } from "mongoose"
import * as path from "path"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import dotenv from "dotenv"



import { ObjectIdScalar } from "./objectId.scalar"
import resolvers from "./resolvers"
import typegooseMiddleware from "./typegooseMiddleware"

// Load env from file unless in production.
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const MONGODB_URI = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
export const PORT = process.env.PORT || 8080

const main = async () => {
  try {
    await connect(
      MONGODB_URI,
      { useNewUrlParser: true },
    )
  } catch (mongoConnectError) {
    console.error(mongoConnectError)
  }
  try {
    const schema = await buildSchema({
      resolvers,
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
      globalMiddlewares: [typegooseMiddleware],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    })
    const server = new ApolloServer({ schema, context: {} })
    const { url } = await server.listen(PORT)
    console.log(`GraphQL Playground running at ${url}`)
  } catch (apolloError) {
    console.error(apolloError)
  }
}

main()
