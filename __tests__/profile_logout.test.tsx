import { render, screen, fireEvent } from '@testing-library/react';
import ProfileLogout from '../src/components/profile-logout/ProfileLogoutPrompt';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../src/redux/store';
import { LightTheme } from '../src/util/LightTheme';
import LogoutPrompt from '../src/components/navbar/logout-prompt/LogoutPrompt';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { open } from 'fs/promises';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(() => ({
        pathname: '/',
    })),
    useNavigate: () => mockNavigate,
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
        i18n: {
            language: 'es',
            changeLanguage: jest.fn(),
        }
    }),
}));


jest.mock('../src/service/HttpRequestService', () => ({
    useHttpRequestService: () => ({
        me: jest.fn().mockResolvedValue({ id: '123' }),
    }),
}));

describe('Profile logout', () => {

    beforeEach(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'portal');
        modalRoot.setAttribute('data-testid', 'portal');
        document.body.appendChild(modalRoot);
    });


    test('renders logout button correctly and fires logout function', () => {
        const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
        
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
                    <LogoutPrompt show={true} setLogoutOpen={jest.fn()} />
                </ThemeProvider>
            </Provider>
        );
        
        const openModalButton = screen.getByText('buttons.logout @test')
        fireEvent.click(openModalButton); 
        
        const logoutButton = screen.getByRole('button', { name: 'buttons.logout' });
        fireEvent.click(logoutButton);

        
        expect(mockRemoveItem).toHaveBeenCalledWith('token');

       
        expect(mockNavigate).toHaveBeenLastCalledWith('/sign-in');

      });
});


