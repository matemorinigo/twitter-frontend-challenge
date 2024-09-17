import { render, screen, fireEvent } from '@testing-library/react';
import LabeledInput from '../src/components/labeled-input/LabeledInput';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../src/redux/store';
import { LightTheme } from '../src/util/LightTheme';

describe('Labeled input', ()=>{
    const queryClient = new QueryClient();

    test('renders input with correct label', () => {
        render(
          <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <ThemeProvider theme={LightTheme}>
              <QueryClientProvider client={queryClient}>
                <LabeledInput title="title" placeholder='placeholder' required={true} />
              </QueryClientProvider>
            </ThemeProvider>
          </Provider>
        </I18nextProvider>
        );
        const label = screen.getByText('title');
        const input = screen.getByPlaceholderText('placeholder');
        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
      });
      
      test('updates input value correctly', () => {
        render(
          <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <ThemeProvider theme={LightTheme}>
              <QueryClientProvider client={queryClient}>
                <LabeledInput title="title" placeholder='placeholder' required={true} />
              </QueryClientProvider>
            </ThemeProvider>
          </Provider>
        </I18nextProvider>
        );
        const input = screen.getByPlaceholderText('placeholder');
        fireEvent.change(input, { target: { value: 'Value' } });
        expect((input as HTMLInputElement).value).toBe('Value');
      });
})


