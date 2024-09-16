import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FollowUserBox from '../src/components/follow-user/FollowUserBox';
import { useHttpRequestService } from '../src/service/HttpRequestService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { ToastContextProvider } from '../src/contexts/ToastContext';
import { LightTheme } from '../src/util/LightTheme';
import { store } from '../src/redux/store';

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

describe('FollowUserBox', () => {
    const mockGetFollowing = jest.fn();
    const mockFollowUser = jest.fn();
    const mockUnfollowUser = jest.fn();
    const mockInvalidateQueries = jest.fn();

    beforeEach(() => {
        (useQuery as jest.Mock).mockImplementation(({ queryKey }: any) => {
            if (queryKey.includes('following')) {
                return { data: [], status: 'success' }; 
            }
            return { data: null, status: 'success' };
        });

        (useMutation as jest.Mock).mockImplementation(({ mutationFn }: any) => ({
            mutate: mutationFn,
        }));

        (useHttpRequestService as jest.Mock).mockReturnValue({
            getFollowing: mockGetFollowing,
            followUser: mockFollowUser,
            unfollowUser: mockUnfollowUser,
        });

        (useQueryClient as jest.Mock).mockReturnValue({
            invalidateQueries: mockInvalidateQueries,
        });
    });

    test('renders the FollowUserBox component and handles follow/unfollow actions', async () => {
        const { rerender } = render(
            <Provider store={store}>
                <ThemeProvider theme={LightTheme}>
                    <ToastContextProvider>
                        <BrowserRouter>
                            <FollowUserBox
                                profilePicture="profile.jpg"
                                name="John Doe"
                                username="johndoe"
                                id="1"
                            />
                        </BrowserRouter>
                    </ToastContextProvider>
                </ThemeProvider>
            </Provider>
        );

        const follow = await screen.findByText('buttons.follow');
        expect(follow).toBeInTheDocument();

        fireEvent.click(follow);

        await waitFor(() => expect(mockFollowUser).toHaveBeenCalled());

        
        (useQuery as jest.Mock).mockReturnValue({ data: [{ followerId: '2', followedId: '1', createdAt: new Date() }], status: 'success' });

        
        rerender(
            <Provider store={store}>
                <ThemeProvider theme={LightTheme}>
                    <ToastContextProvider>
                        <BrowserRouter>
                            <FollowUserBox
                                profilePicture="profile.jpg"
                                name="John Doe"
                                username="johndoe"
                                id="1"
                            />
                        </BrowserRouter>
                    </ToastContextProvider>
                </ThemeProvider>
            </Provider>
        );

        const unfollow = await screen.findByText('buttons.unfollow');
        expect(unfollow).toBeInTheDocument();

        fireEvent.click(unfollow);

        await waitFor(() => expect(mockUnfollowUser).toHaveBeenCalled());
    });
});

