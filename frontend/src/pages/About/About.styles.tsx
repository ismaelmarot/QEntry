import styled from 'styled-components'

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);

  @media (min-width: 768px) {
    font-size: 34px;
  }
`