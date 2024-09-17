import { render, screen } from '@testing-library/react';
import Loader from '../src/components/loader/Loader';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../src/redux/store';
import { LightTheme } from '../src/util/LightTheme';

describe('Loader', () => {
    const queryClient = new QueryClient()

    test('renders loader correctly', () => {
        render(
          <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <ThemeProvider theme={LightTheme}>
              <QueryClientProvider client={queryClient}>
                <Loader />
              </QueryClientProvider>
            </ThemeProvider>
          </Provider>
        </I18nextProvider>
        
        );
        const loader = screen.getByTestId('loader-spinner');
        expect(loader).toBeInTheDocument();
      });
})




