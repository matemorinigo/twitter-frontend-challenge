import { render, screen, fireEvent } from '@testing-library/react';
import TweetBox from '../src/components/tweet-box/TweetBox';
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


describe('Tweet box', () => {

    test('renders tweet input correctly', () => {

        (useQuery as jest.Mock).mockReturnValue({
            data: {
            }, status: 'success'
        });

        render(
            <Provider store={store}>
                <ThemeProvider theme={LightTheme}>
                    <ToastContextProvider>
                        <BrowserRouter>
                            <TweetBox />
                        </BrowserRouter>
                    </ToastContextProvider>
                </ThemeProvider>
            </Provider>

        );
        const input = screen.getByPlaceholderText('placeholder.tweet');
        expect(input).toBeInTheDocument();
    });

    test('limit text to 240 characters', () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={LightTheme}>
                    <ToastContextProvider>
                        <BrowserRouter>
                            <TweetBox />
                        </BrowserRouter>
                    </ToastContextProvider>
                </ThemeProvider>
            </Provider>);
        const input = screen.getByPlaceholderText('placeholder.tweet');
        fireEvent.change(input, { target: { value: 'a'.repeat(300) } });
        fireEvent.change(input, { target: { value: 'a'.repeat(300) } });
            
        expect((input as HTMLTextAreaElement).value.length).toBeLessThanOrEqual(240);
    });
})


