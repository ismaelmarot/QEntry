import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineQrcode, HiOutlineSwitchHorizontal, HiOutlinePlusCircle } from 'react-icons/hi';
import { InOutContent } from '../../components/InOutContent';
import { InOutCamera } from '../../components/InOutCamera';

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
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const OptionCard = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 24px;
  background: ${(p) => p.$active ? '#007AFF' : '#F2F2F7'};
  border-radius: 16px;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  min-width: 100px;

  ${(p) => p.$active && `
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionIcon = styled.span<{ $color: string; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${(p) => p.$active ? 'white' : p.$color};
  color: ${(p) => p.$active ? '#007AFF' : 'white'};
`;

const OptionLabel = styled.span<{ $active?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$active ? 'white' : '#1C1C1E'};
`;

const ContentArea = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-height: 400px;
`;

const PlaceholderText = styled.p`
  text-align: center;
  color: #8E8E93;
  font-size: 16px;
  padding: 60px 20px;
`;

const AddNewPersonButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #F2F2F7;
  border: 1px dashed #007AFF;
  border-radius: 12px;
  color: #007AFF;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  &:hover { background: #E5E5EA; }
`;

type ViewType = 'none' | 'scanner' | 'manual' | 'addPerson';

export function InOut() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewType>('none');

  const handleOptionClick = (view: ViewType) => {
    if (view === 'manual') {
      navigate('/manual');
    } else if (view === 'addPerson') {
      navigate('/persons/new');
    } else {
      setCurrentView(view);
    }
  };

  return (
    <Container>
      <Title>IN/OUT</Title>
      
      <Section>
        <SectionTitle>Seleccione una opción</SectionTitle>
        <OptionsGrid>
          <OptionCard $active={currentView === 'scanner'} onClick={() => handleOptionClick('scanner')}>
            <OptionIcon $color="#007AFF" $active={currentView === 'scanner'}>
              <HiOutlineQrcode size={24} />
            </OptionIcon>
            <OptionLabel $active={currentView === 'scanner'}>Escáner QR</OptionLabel>
          </OptionCard>

          <OptionCard $active={currentView === 'manual'} onClick={() => handleOptionClick('manual')}>
            <OptionIcon $color="#FF9500" $active={currentView === 'manual'}>
              <HiOutlineSwitchHorizontal size={24} />
            </OptionIcon>
            <OptionLabel $active={currentView === 'manual'}>Carga Manual</OptionLabel>
          </OptionCard>

          <OptionCard $active={currentView === 'addPerson'} onClick={() => handleOptionClick('addPerson')}>
            <OptionIcon $color="#34C759" $active={currentView === 'addPerson'}>
              <HiOutlinePlusCircle size={24} />
            </OptionIcon>
            <OptionLabel $active={currentView === 'addPerson'}>Agregar Persona</OptionLabel>
          </OptionCard>
        </OptionsGrid>
      </Section>

      <ContentArea>
        {currentView === 'none' && (
          <PlaceholderText>Seleccione una opción arriba</PlaceholderText>
        )}
        {currentView === 'scanner' && (
          <InOutCamera />
        )}
        {currentView === 'manual' && (
          <InOutContent />
        )}
        {currentView === 'addPerson' && (
          <PlaceholderText>
            <AddNewPersonButton onClick={() => navigate('/persons/new')}>
              Nueva Persona
            </AddNewPersonButton>
          </PlaceholderText>
        )}
      </ContentArea>
    </Container>
  );
}