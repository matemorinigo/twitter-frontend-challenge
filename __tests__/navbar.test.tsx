import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/navbar/NavBar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from '../src/util/LightTheme';
import { useQuery } from '@tanstack/react-query';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(() => ({
        pathname: '/',
    })),
    useNavigate: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn().mockReturnValue({
        invalidateQueries: jest.fn(),
    }),
}));


jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key, 
    }),
}));


jest.mock('../src/service/HttpRequestService', () => ({
    useHttpRequestService: () => ({
        me: jest.fn().mockResolvedValue({ id: '123' }),
    }),
}));

describe('Navbar', () => {

    test('renders navbar links correctly', async () => {

        (useQuery as jest.Mock).mockReturnValue({
            data: {
                id: '1',
                username: 'test',
                private: 'false',
                createdAt: new Date(),
                followers: [],
                following: [],
                posts: []
            }, status: 'success'
        });

        render(
            <Provider store={store}>
                <ThemeProvider theme={LightTheme}>
                    <Navbar />
                </ThemeProvider>
            </Provider>

        );


        expect(screen.getByText('navbar.home')).toBeInTheDocument();
        expect(screen.getByText('navbar.message')).toBeInTheDocument();
        expect(screen.getByText('navbar.profile')).toBeInTheDocument();
    });
});