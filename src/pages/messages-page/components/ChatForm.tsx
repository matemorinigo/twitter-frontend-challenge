import { Field, Form, Formik } from 'formik'
import React from 'react'
import Button from '../../../components/button/Button'
import { ButtonType } from '../../../components/button/StyledButton'
import { StyledChatFormContainer } from './StyledChatFormContainer'

const ChatForm = () => {

    const initialValues = {
        message: ''
    }

    return (
        <Formik initialValues={initialValues} validate={(values) => {
            const errors: Partial<{message: string}> = {};
            return errors
        }} onSubmit={async (values, { resetForm, setErrors, setSubmitting }) => {}} >
            <Form>
                <StyledChatFormContainer> 
                    <Field style={{width: '75%'}} id='message' name='message'/>
                    <Button text='Send' size='small' buttonType={ButtonType.OUTLINED} type='submit'/>
                </StyledChatFormContainer>
            </Form>
        </Formik>
    )
}

export default ChatForm