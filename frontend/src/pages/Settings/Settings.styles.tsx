import styled from 'styled-components'
import { theme } from '@/styles/theme'

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const Header = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.text};

  @media (min-width: 768px) {
    font-size: 34px;
  }
`