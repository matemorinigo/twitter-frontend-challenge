import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../src/components/modal/Modal';
import Button from '../src/components/button/Button';
import { ButtonType } from '../src/components/button/StyledButton';
import React from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../src/redux/store';
import { LightTheme } from '../src/util/LightTheme';

describe('Modal', () => {
    beforeEach(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'portal');
        modalRoot.setAttribute('data-testid', 'portal');
        document.body.appendChild(modalRoot);
    });

    test('renders and closes the modal correctly', () => {
        const handleClose = jest.fn();

        render(

            <I18nextProvider i18n={i18next}>
                <Provider store={store}>
                    <ThemeProvider theme={LightTheme}>
                        <Modal
                            show={true}
                            onClose={handleClose}
                            title='modal'
                            acceptButton={
                                <Button
                                    buttonType={ButtonType.FOLLOW}
                                    text={'button text'}
                                    size={"MEDIUM"}
                                    onClick={() => { }}
                                />
                            }
                        />
                    </ThemeProvider>
                </Provider>
            </I18nextProvider>
        );


        const content = screen.getByText('button text');
        expect(content).toBeInTheDocument();


        const closeButton = screen.getByText('Cancel');
        fireEvent.click(closeButton);


        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});



