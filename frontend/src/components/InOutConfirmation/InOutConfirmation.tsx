import { HiCheckCircle, HiXCircle, HiArrowDown, HiArrowUp } from 'react-icons/hi';
import { useInOutConfirmation } from './useInOutConfirmation';
import * as S from './InOutConfirmation.styles';

export function InOutConfirmation() {
  const {
    showPopup,
    pendingPerson,
    currentStatus,
    isProcessing,
    result,
    handleConfirm,
    handleClose,
    handleReset,
  } = useInOutConfirmation();

  if (!showPopup) return null;

  const showResult = result && pendingPerson && !currentStatus;

  return (
    <S.Overlay onClick={handleClose}>
      <S.PopupCard onClick={(e) => e.stopPropagation()}>
        {showResult ? (
          <>
            <S.ResultMessage $success={result.success}>
              <S.ResultIcon $success={result.success}>
                {result.success ? <HiCheckCircle size={40} /> : <HiXCircle size={40} />}
              </S.ResultIcon>
              <S.ResultText $success={result.success}>
                {result.message}
              </S.ResultText>
            </S.ResultMessage>

            {pendingPerson && (
              <S.PersonInfo>
                <S.Avatar $src={pendingPerson.photo_url}>
                  {!pendingPerson.photo_url && pendingPerson.first_name?.charAt(0)}
                </S.Avatar>
                <S.PersonName>
                  {pendingPerson.last_name} {pendingPerson.first_name}
                </S.PersonName>
                {pendingPerson.dni && (
                  <S.PersonMeta>DNI: {pendingPerson.dni}</S.PersonMeta>
                )}
              </S.PersonInfo>
            )}

            <S.ScanAgainButton onClick={handleReset}>
              Escanear otro QR
            </S.ScanAgainButton>
            
            <S.CancelButton onClick={handleClose}>
              Cerrar
            </S.CancelButton>
          </>
        ) : (
          <>
            {pendingPerson && (
              <S.PersonInfo>
                <S.Avatar $src={pendingPerson.photo_url}>
                  {!pendingPerson.photo_url && pendingPerson.first_name?.charAt(0)}
                </S.Avatar>
                <S.PersonName>
                  {pendingPerson.last_name} {pendingPerson.first_name}
                </S.PersonName>
                {pendingPerson.dni && (
                  <S.PersonMeta>DNI: {pendingPerson.dni}</S.PersonMeta>
                )}
              </S.PersonInfo>
            )}

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <S.StatusBadge $type={currentStatus === 'inside' ? 'out' : 'in'}>
                {currentStatus === 'inside' ? (
                  <>
                    <HiArrowUp size={16} />
                    dentro del edificio
                  </>
                ) : (
                  <>
                    <HiArrowDown size={16} />
                    fuera del edificio
                  </>
                )}
              </S.StatusBadge>
            </div>

            <S.ActionButtons>
              <S.ActionButton
                $variant="in"
                onClick={() => handleConfirm('entry')}
                disabled={isProcessing}
              >
                <HiArrowDown size={20} />
                Check IN
              </S.ActionButton>
              <S.ActionButton
                $variant="out"
                onClick={() => handleConfirm('exit')}
                disabled={isProcessing}
              >
                <HiArrowUp size={20} />
                Check OUT
              </S.ActionButton>
            </S.ActionButtons>

            <S.CancelButton onClick={handleClose}>
              Cancelar
            </S.CancelButton>
          </>
        )}
      </S.PopupCard>
    </S.Overlay>
  );
}