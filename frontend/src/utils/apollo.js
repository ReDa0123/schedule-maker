import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { useAuth } from 'src/modules/auth';
import { config } from 'src/config';
import { route } from 'src/Routes';
import PropTypes from 'prop-types';
import { createUploadLink } from 'apollo-upload-client';

const UNAUTHENTICATED_CODE = 'UNAUTHENTICATED';

const hasUnauthenticatedErrorCode = (errors) => {
  return (
    errors &&
    errors.some((error) => error.extensions.code === UNAUTHENTICATED_CODE)
  );
};

const hasNetworkStatusCode = (error, code) => {
  return error && error.statusCode === code;
};

function EnhancedApolloProvider({ children }) {
  const navigate = useNavigate();
  const { token, signout } = useAuth();

  const handleSignOut = useCallback(() => {
    signout();
    navigate(route.login());
    window.location.reload();
  }, [signout, navigate]);

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return forward(operation);
  });

  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (
      hasUnauthenticatedErrorCode(graphQLErrors) ||
      hasNetworkStatusCode(networkError, 401)
    ) {
      handleSignOut();
    }
  });

  const uploadLink = createUploadLink({
    uri: config.GRAPHQL_API,
  });

  const client = new ApolloClient({
    link: from([logoutLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

EnhancedApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { EnhancedApolloProvider };
