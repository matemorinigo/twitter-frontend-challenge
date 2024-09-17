import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Toast, { ToastType } from '../src/components/toast/Toast';
import { ThemeProvider } from 'styled-components';
import { LightTheme } from '../src/util/LightTheme';

describe('Toast', () => {
    test('renders success toast correctly', () => {
        render(
            <ThemeProvider theme={LightTheme}>
                <Toast message="Something done" type={ToastType.SUCCESS} />
            </ThemeProvider>

        );
        const toastMessage = screen.getByText('Something done');
        expect(toastMessage).toBeInTheDocument();
    });
    test('renders alert toast correctly', () => {
        render(
            <ThemeProvider theme={LightTheme}>
                <Toast message="Something happened" type={ToastType.ALERT} />
            </ThemeProvider>
        );
        const toastMessage = screen.getByText('Something happened');
        expect(toastMessage).toBeInTheDocument();
    });
})


