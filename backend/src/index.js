import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { MOCKS, PORT } from './config/variables';
import { getConnection } from './libs/connection';
import { schema } from './modules/executableSchema';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  const dbConnection = MOCKS ? null : await getConnection();

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req.headers.Authorization || req.headers.authorization || '';

      return {
        dbConnection,
        auth,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  app.use(graphqlUploadExpress());

  apolloServer.applyMiddleware({ app, cors: false });

  const port = PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.get('/resources/batchTemplate', (_, res) =>
    res.download('./resources/batch_import_template.xlsx')
  );

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
