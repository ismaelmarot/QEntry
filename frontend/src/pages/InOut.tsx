import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineQrcode, HiOutlineSwitchHorizontal, HiOutlinePlusCircle } from 'react-icons/hi';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1C1C1E;

  @media (min-width: 768px) {
    font-size: 34px;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1C1C1E;
  text-align: center;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

const OptionCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 20px;
  background: #F2F2F7;
  border-radius: 20px;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionIcon = styled.span<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  color: white;
`;

const OptionLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
`;

export function InOut() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>In / Out</Title>
      
      <Section>
        <SectionTitle>Seleccione una opción</SectionTitle>
        <OptionsGrid>
          <OptionCard onClick={() => navigate('/scanner')}>
            <OptionIcon $color="#007AFF">
              <HiOutlineQrcode size={32} />
            </OptionIcon>
            <OptionLabel>Escanear QR</OptionLabel>
          </OptionCard>

          <OptionCard onClick={() => navigate('/scanner/manual')}>
            <OptionIcon $color="#FF9500">
              <HiOutlineSwitchHorizontal size={32} />
            </OptionIcon>
            <OptionLabel>Carga Manual</OptionLabel>
          </OptionCard>

          <OptionCard onClick={() => navigate('/persons')}>
            <OptionIcon $color="#34C759">
              <HiOutlinePlusCircle size={32} />
            </OptionIcon>
            <OptionLabel>Agregar Persona</OptionLabel>
          </OptionCard>
        </OptionsGrid>
      </Section>
    </Container>
  );
}
