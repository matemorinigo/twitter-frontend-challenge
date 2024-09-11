import React from 'react'
import { StyledNoSelectedUserMessageContainer } from './NoSelectedUserMessageContainer'
import { t } from 'i18next'
import { StyledH3, StyledP } from './StyledNoSelectedTexts'

const NoSelectedUserMessage = () => {
  return (
    <StyledNoSelectedUserMessageContainer>
        <StyledH3>{t('messages.noSelected')}</StyledH3>
        <StyledP>{t('messages.noSelectedText')}</StyledP>
    </StyledNoSelectedUserMessageContainer>
  )
}

export default NoSelectedUserMessage