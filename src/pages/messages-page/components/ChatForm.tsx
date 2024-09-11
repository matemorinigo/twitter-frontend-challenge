import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/button/Button'
import { ButtonType } from '../../../components/button/StyledButton'
import { StyledChatFormContainer } from './StyledChatFormContainer'
import { Socket } from 'socket.io-client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useHttpRequestService } from '../../../service/HttpRequestService'
import user from '../../../redux/user'

interface ChatFormProps {
    receiverId: string, 
    socket: Socket
}

const ChatForm = ({receiverId, socket}: ChatFormProps) => {
    const [room, setRoom] = useState<string | null>(null)

    const initialValues = {
        message: ''
    }

    const service = useHttpRequestService();
    const queryClient = useQueryClient();

    const userQuery = useQuery({
      queryKey: ["me"],
      queryFn: () => service.me()
    })


    useEffect(()=> {
        if(userQuery.status === 'success') {
            setRoom(`${userQuery.data.id}-${receiverId}`)
        }
    }, [userQuery.status, userQuery.data])
    

    return (
        <Formik initialValues={initialValues} validate={(values) => {
            const errors: Partial<{message: string}> = {};
            return errors
        }} onSubmit={async (values, { resetForm, setErrors, setSubmitting }) => {
            if(room) {
                socket.emit('message:send', receiverId, {message: values.message})
                setSubmitting(false)
                resetForm()
            } else {
                setErrors({message: 'Error sending message'})
            }
            queryClient.invalidateQueries({
                queryKey: ['chat', receiverId]
            })
        }} >
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