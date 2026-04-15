import { useState, useRef } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineDownload } from 'react-icons/hi';

interface PersonCardData {
  first_name: string;
  last_name: string;
  dni?: string;
  type: string;
  role_code?: string;
  categoryLabel?: string;
  categoryColor?: string;
  qrValue: string;
}

const SectionContainer = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SectionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #F2F2F7; }
`;

const SectionTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
`;

const SectionContent = styled.div<{ $expanded: boolean }>`
  display: ${(p) => p.$expanded ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px;
  gap: 20px;
`;

const CardWrapper = styled.div<{ $color: string }>`
  width: 100%;
  max-width: 220px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px ${(p) => p.$color}30;
  display: flex;
  position: relative;
  background: white;
`;

const ColorStripe = styled.div<{ $color: string }>`
  width: 20px;
  background: linear-gradient(180deg, ${(p) => p.$color} 0%, ${(p) => p.$color}CC 100%);
`;

const CardContent = styled.div`
  flex: 1;
  background: white;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const QRContainer = styled.div`
  background: white;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const PersonInfo = styled.div`
  text-align: center;
`;

const PersonName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1C1C1E;
  margin: 0 0 4px 0;
  line-height: 1.2;
`;

const PersonDni = styled.p`
  font-size: 11px;
  color: #8E8E93;
  margin: 0;
  font-weight: 500;
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
`;

const CategoryBadge = styled.span<{ $color: string }>`
  padding: 5px 12px;
  background: ${(p) => p.$color};
  color: white;
  border-radius: 14px;
  font-size: 10px;
  font-weight: 600;
  width: fit-content;
`;

const RoleCodeBadge = styled.span<{ $color: string }>`
  padding: 4px 10px;
  background: ${(p) => p.$color}15;
  color: ${(p) => p.$color};
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
`;

const CompanyLogo = styled.div`
  font-size: 9px;
  color: #AEAEB2;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: auto;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 6px 20px rgba(0, 122, 255, 0.35);
  &:hover { background: #0062CC; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 122, 255, 0.4); }
  &:active { transform: scale(0.98); }
`;

interface PersonCardProps {
  person: PersonCardData;
  onDownload?: () => void;
}

export function PersonCard({ person, onDownload }: PersonCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
    });
    
    const link = document.createElement('a');
    link.download = `${person.last_name}_${person.first_name}_card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    onDownload?.();
  };

  const categoryColor = person.categoryColor || '#007AFF';
  const categoryLabel = person.categoryLabel || person.type;

  return (
    <SectionContainer>
      <SectionHeader onClick={() => setExpanded(!expanded)}>
        <SectionTitle>Tarjeta de identificación</SectionTitle>
        {expanded ? <HiOutlineChevronUp size={20} color="#8E8E93" /> : <HiOutlineChevronDown size={20} color="#8E8E93" />}
      </SectionHeader>
      
      <SectionContent $expanded={expanded}>
        <CardWrapper ref={cardRef} $color={categoryColor}>
          <ColorStripe $color={categoryColor} />
          <CardContent>
            <QRContainer>
              <QRCodeSVG
                value={person.qrValue}
                size={180}
                level="M"
                includeMargin={false}
              />
            </QRContainer>
            
            <PersonInfo>
              <PersonName>{person.last_name}<br/>{person.first_name}</PersonName>
              {person.dni && <PersonDni>DNI: {person.dni}</PersonDni>}
            </PersonInfo>
            
            <MetaRow>
              {categoryLabel && (
                <CategoryBadge $color={categoryColor}>
                  {categoryLabel}
                </CategoryBadge>
              )}
              {person.role_code && (
                <RoleCodeBadge $color={categoryColor}>
                  Rol: {person.role_code}
                </RoleCodeBadge>
              )}
            </MetaRow>
            
            <CompanyLogo>QEntry</CompanyLogo>
          </CardContent>
        </CardWrapper>
        
        <DownloadButton onClick={handleDownload}>
          <HiOutlineDownload size={18} />
          Descargar Tarjeta
        </DownloadButton>
      </SectionContent>
    </SectionContainer>
  );
}