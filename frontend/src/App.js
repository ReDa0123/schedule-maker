import { BrowserRouter } from 'react-router-dom';

import { CustomChakraProvider } from 'src/shared/design-system';
import { ScrollToTop } from 'src/shared/navigation';

import { AuthProvider } from 'src/modules/auth';

import { EnhancedApolloProvider } from 'src/utils/apollo';
import { Routes } from 'src/Routes';
import { Body } from './shared/design-system/atoms/Body';
import { Header, Footer } from './shared/design-system/molecules/';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export function App() {
  return (
    <CustomChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedApolloProvider>
            <DndProvider backend={HTML5Backend}>
              <ScrollToTop />
              <Body>
                <Header />
                <Routes />
                <Footer />
              </Body>
            </DndProvider>
          </EnhancedApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </CustomChakraProvider>
  );
}
