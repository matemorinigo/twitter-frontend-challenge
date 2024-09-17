import { render, screen, waitFor } from '@testing-library/react'
import Feed from '../src/components/feed/Feed'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContextProvider } from '../src/contexts/ToastContext'
import { ThemeProvider } from 'styled-components'
import { LightTheme } from '../src/util/LightTheme'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'


beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe('Feed', () => {
  test('renders feed', async () => {
    const posts = [
      {
        id: '1', content: 'Post1', author: {
          id: '1',
          username: 'user1',
          createdAt: new Date(),
          private: false
        }, createdAt: new Date(), authorId: '1', reactions: [], comments: []
      },
      {
        id: '2', content: 'Post2', author: {
          id: '2',
          username: 'user2',
          createdAt: new Date(),
          private: false
        }, createdAt: new Date(), authorId: '2', reactions: [], comments: []
      },
    ]
    const fetchNextPage = jest.fn()
    const hasNextPage = true
    const loading = false
    const queryClient = new QueryClient()

    render(

      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <ThemeProvider theme={LightTheme}>
            <QueryClientProvider client={queryClient}>
              <ToastContextProvider>
                <BrowserRouter>
                  <Feed posts={posts} fetchNextPage={fetchNextPage} loading={false} />
                </BrowserRouter>
              </ToastContextProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </Provider>
      </I18nextProvider>
    )


    const tweet1 = await screen.findByText('Post1');
    expect(tweet1).toBeInTheDocument();

    const tweet2 = await screen.findByText('Post2');
    expect(tweet2).toBeInTheDocument();
  })

  test('shows loader', async () => {
    const posts = [
      {
        id: '1', content: 'Post1', author: {
          id: '1',
          username: 'user1',
          createdAt: new Date(),
          private: false
        }, createdAt: new Date(), authorId: '1', reactions: [], comments: []
      },
      {
        id: '2', content: 'Post2', author: {
          id: '2',
          username: 'user2',
          createdAt: new Date(),
          private: false
        }, createdAt: new Date(), authorId: '2', reactions: [], comments: []
      },
    ]
    const fetchNextPage = jest.fn()
    const hasNextPage = true
    const loading = true
    const queryClient = new QueryClient()
    render(
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <ThemeProvider theme={LightTheme}>
            <QueryClientProvider client={queryClient}>
              <ToastContextProvider>
                <BrowserRouter>
                  <Feed posts={posts} fetchNextPage={fetchNextPage} loading={true} />
                </BrowserRouter>
              </ToastContextProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </Provider>
      </I18nextProvider>
    );
    const loader = await screen.findByTestId('loader-spinner');
    expect(loader).toBeInTheDocument();
  });
})
