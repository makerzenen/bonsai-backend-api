import { ObjectId } from "mongodb"
import { connect } from "mongoose"
import * as path from "path"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import dotenv from "dotenv"
import http from "http"
import methods from "methods"
import express from "express"
import bodyParser from "body-parser"
import session from "express-session"
import errorhandler from "errorhandler"
import pino from "express-pino-logger"
import { ApolloServer, gql } from "apollo-server-express"

import router from "./routes"
import logger from "./logger"
import { ObjectIdScalar } from "./objectId.scalar"
import resolvers from "./resolvers"
import typegooseMiddleware from "./typegooseMiddleware"

// Load env from file unless in production.
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const MONGODB_URI = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
export const PORT = process.env.PORT || 8080

export function buildExpress() {
  const expressLogger = pino({ logger });
  const isProduction = process.env.NODE_ENV === "production";

  const app = express();
  app.use(expressLogger);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require("method-override")());
  app.use(express.static(__dirname + "/public"));
  app.use(
    session({
      secret: "conduit",
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(`/api/v${process.env.API_VERSION}/`, router);

  // Error handling.
  if (!isProduction) {
    app.use(errorhandler());
  }
  /*
  app.use(function (req, res, next) {
    const err = new Error("Not Found", status: 404);
    next(err);
  });

  if (!isProduction) {
    app.use(function (err, req, res, next) {
      logger.error(err.stack);

      res.status(err.status || 500);

      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  });
  */
  return app
}

// Build apollo server.
export function buildApollo(app: any, schema: any) {
  const apolloServer = new ApolloServer({ schema, context: {} })
  apolloServer.applyMiddleware({ app })
  const server = app.listen(process.env.PORT, () => {
    logger.info(`API is available at http://localhost:${process.env.PORT}/api/v${process.env.API_VERSION}/`);
  });
  return server
}

// Build graphql schema.
export async function buildGraphqlSchema() {
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    globalMiddlewares: [typegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
  })
  return schema
}

// Build server with Apollo, Expresss, GraphQL schema.
export async function buildServer() {
  const server = buildApollo(buildExpress(), buildGraphqlSchema())
  return server
}

const main = async () => {
  // Connect to MongoDB.
  try {
    await connect(
      MONGODB_URI,
      { useNewUrlParser: true },
    )
  } catch (mongoConnectError) {
    logger.error(mongoConnectError)
  }
  try {
    const server = await buildServer()
  } catch (apolloError) {
    logger.error(apolloError)
  }
}

main()
