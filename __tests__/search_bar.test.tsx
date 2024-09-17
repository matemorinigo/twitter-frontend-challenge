import { render, screen, fireEvent } from '@testing-library/react';
import {SearchBar} from '../src/components/search-bar/SearchBar';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContextProvider } from '../src/contexts/ToastContext';
import { store } from '../src/redux/store';
import { LightTheme } from '../src/util/LightTheme';
import { useQuery } from '@tanstack/react-query';

jest.mock('../src/service/HttpRequestService', () => ({
    useHttpRequestService: jest.fn().mockReturnValue({
        getFollowing: jest.fn(),
        followUser: jest.fn(),
        unfollowUser: jest.fn(),
    }),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn().mockReturnValue({
        invalidateQueries: jest.fn(),
    }),
}));



describe('Search bar', ()=>{
    test('updates input value correctly', () => {

        (useQuery as jest.Mock).mockReturnValue({ data: [], status: 'success' })

        render(
            <Provider store={store}>
            <ThemeProvider theme={LightTheme}>
                <ToastContextProvider>
                    <BrowserRouter>
                        <SearchBar />
                    </BrowserRouter>
                </ToastContextProvider>
            </ThemeProvider>
        </Provider>
        );
        
        const input = screen.getByPlaceholderText('placeholder.search');
        fireEvent.change(input, { target: { value: 'search' } });
        expect((input as HTMLInputElement).value).toBe('search');
      });
})

