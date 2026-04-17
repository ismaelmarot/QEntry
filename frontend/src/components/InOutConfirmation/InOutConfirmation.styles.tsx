import styled from 'styled-components';
import { HiCheckCircle, HiXCircle, HiArrowDown, HiArrowUp, HiOutlineX } from 'react-icons/hi';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const PopupCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #F2F2F7;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8E8E93;
  &:hover { background: #E5E5EA; }
`;

export const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Avatar = styled.div<{ $src?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : '#E5E5EA'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #8E8E93;
  font-weight: 600;
`;

export const PersonName = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1C1C1E;
  margin: 0;
  text-align: center;
`;

export const PersonMeta = styled.p`
  font-size: 14px;
  color: #8E8E93;
  margin: 0;
`;

export const StatusBadge = styled.div<{ $type: 'in' | 'out' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: ${(p) => p.$type === 'in' ? '#34C759' : '#FF9500'};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

export const ResultMessage = styled.div<{ $success: boolean }>`
  text-align: center;
  padding: 16px;
  border-radius: 12px;
  background: ${(p) => p.$success ? '#E8FCE8' : '#FFE5E5'};
  margin-bottom: 20px;
`;

export const ResultIcon = styled.div<{ $success: boolean }>`
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
  margin-bottom: 8px;
`;

export const ResultText = styled.p<{ $success: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
  margin: 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button<{ $variant: 'in' | 'out' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$variant === 'in' ? '#34C759' : '#FF9500'};
  color: white;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(p) => p.$variant === 'in' ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 149, 0, 0.3)'};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #8E8E93;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    color: #1C1C1E;
  }
`;

export const ScanAgainButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #007AFF;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    text-decoration: underline;
  }
`;