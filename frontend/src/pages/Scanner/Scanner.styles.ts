import { flex, size } from '@/mixins'
import styled from 'styled-components'

export const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
`

export const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
    color: #1C1C1E;

    @media (min-width: 768px) {
        font-size: 34px;
    }
`

export const Tabs = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    background: #E5E5EA;
    padding: 4px;
    border-radius: 12px;
`

export const Tab = styled.button<{ $active: boolean }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
    background: ${(p) => (p.$active ? 'white' : 'transparent')};
    color: ${(p) => (p.$active ? '#007AFF' : '#8E8E93')};
    box-shadow: ${(p) => (p.$active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none')};
    transition: all 0.2s;
`

export const TabIcon = styled.span`
    display: flex;
    align-items: center;
`

export const ScannerBox = styled.div`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 20px;
    overflow: hidden;
    background: #1C1C1E;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`

export const StatusCard = styled.div<{ $success: boolean }>`
    margin-top: 20px;
    padding: 24px 20px;
    border-radius: 16px;
    text-align: center;
    background: ${(p) => (p.$success ? '#E8FCE8' : '#FFE5E5')};
    animation: slideUp 0.3s ease;

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const StatusIconWrapper = styled.div<{ $success: boolean }>`
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
    color: ${(p) => (p.$success ? '#34C759' : '#FF3B30')};
`

export const StatusText = styled.div<{ $success: boolean }>`
    font-size: 20px;
    font-weight: 600;
    color: ${(p) => (p.$success ? '#34C759' : '#FF3B30')};
`

export const PersonInfo = styled.div`
    margin-top: 12px;
    font-size: 16px;
    color: #1C1C1E;
    font-weight: 500;
`

export const Button = styled.button`
    width: 100%;
    padding: 16px;
    background: #007AFF;
    color: white;
    font-size: 17px;
    font-weight: 600;
    border-radius: 12px;
    margin-top: 16px;
    transition: all 0.2s;

    &:active {
        transform: scale(0.98);
    }
`

export const ManualCard = styled.div`
    background: white;
    padding: 24px 20px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`

export const Input = styled.input`
    width: 100%;
    padding: 16px;
    border: 1px solid #E5E5EA;
    border-radius: 12px;
    font-size: 16px;
    background: #F2F2F7;
    margin-bottom: 16px;
    transition: all 0.2s;

    &:focus {
        border-color: #007AFF;
        background: white;
        outline: none;
        box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
    }
`

export const SubmitButton = styled.button`
    width: 100%;
    padding: 16px;
    background: #34C759;
    color: white;
    font-size: 17px;
    font-weight: 600;
    border-radius: 12px;
    transition: all 0.2s;

    &:active {
        transform: scale(0.98);
    }
`

export const QRPreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px;
    background: white;
    border-radius: 20px;
    margin-top: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`

export const QRCodeWrapper = styled.div`
    padding: 20px;
    background: white;
    border-radius: 16px;
    border: 1px solid #E5E5EA;
    margin-bottom: 20px;
`

export const PersonName = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #1C1C1E;
`

export const HelperText = styled.p`
    font-size: 13px;
    color: #8E8E93;
    text-align: center;
    margin-top: 12px;
`

export const SearchResults = styled.div`
    margin-top: 16px;
    max-height: 300px;
    overflow-y: auto;
`

export const SearchResultItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #F2F2F7;
    border-radius: 12px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #E5E5EA;
    }
`

export const PersonAvatar = styled.div<{ $src?: string }>`
    ${flex('column', 'center', 'center')};
    ${size(44,44)};
    border-radius: 50%;
    background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : '#E5E5EA'};
    overflow: hidden;
    flex-shrink: 0;
    
    img {
        ${size('100%', '100%')};
        object-fit: cover;
    }
`

export const PersonDetails = styled.div`
    flex: 1;
    min-width: 0;
`

export const PersonNameResult = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #1C1C1E;
`

export const PersonMetaResult = styled.div`
    font-size: 13px;
    color: #8E8E93;
`

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 16px;
`

export const ActionButton = styled.button<{ $entry?: boolean }>`
    flex: 1;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    background: ${(p) => p.$entry ? '#34C759' : '#FF9500'};
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s;

    &:active {
        transform: scale(0.98);
    }
`

export const NoResults = styled.div`
    text-align: center;
    padding: 20px;
    color: #8E8E93;
`

export const SelectedPersonCard = styled.div`
    background: white;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
`

export const SelectedPersonHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
`

export const SelectedPersonName = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #1C1C1E;
`

export const ClearButton = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: #FF3B30;
    background: transparent;
    border: none;
    cursor: pointer;
`

export const AddNewPersonButton = styled.button`
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
    &:hover {
        background: #E5E5EA;
    }
`

export const NewPersonForm = styled.form`
    background: #F2F2F7;
    padding: 20px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const FormTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #1C1C1E;
    text-align: center;
    margin-bottom: 8px;
`

export const FormRow = styled.div`
    display: flex;
    gap: 12px;
`

export const FormInput = styled.input`
    flex: 1;
    padding: 12px 14px;
    border: 1px solid #E5E5EA;
    border-radius: 10px;
    font-size: 15px;
    background: white;
    &:focus {
        border-color: #007AFF;
        outline: none;
    }
`

export const FormButtons = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
`

export const FormCancelButton = styled.button`
    flex: 1;
    padding: 12px;
    background: #F2F2F7;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    color: #8E8E93;
    cursor: pointer;
`

export const FormSaveButton = styled.button<{ disabled?: boolean }>`
    flex: 1;
    padding: 12px;
    background: #007AFF;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    opacity: ${(p) => p.disabled ? 0.6 : 1};
`