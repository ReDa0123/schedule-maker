import { BrowserRouter } from 'react-router-dom';

import { CustomChakraProvider } from 'src/shared/design-system';
import { ScrollToTop } from 'src/shared/navigation';

import { AuthProvider } from 'src/modules/auth';

import { EnhancedApolloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';

export function App() {
  return (
    <CustomChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedApolloProvider>
            <ScrollToTop />
            <Routes />
          </EnhancedApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </CustomChakraProvider>
  );
}
