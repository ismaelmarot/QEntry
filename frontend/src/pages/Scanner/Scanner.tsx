import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Icons } from '@/constants'
import { useScanner } from './useScanner'
import { api } from '@/services'

import {
  ActionButton,
  ActionButtons,
  AddNewPersonButton,
  BackButton,
  Button,
  ClearButton,
  Container,
  FormButtons,
  FormCancelButton,
  FormInput,
  FormRow,
  FormSaveButton,
  FormTitle,
  Header,
  Input,
  ManualCard,
  NewPersonForm,
  NoResults,
  PersonAvatar,
  PersonDetails,
  PersonMetaResult,
  PersonName,
  PersonNameResult,
  QRCodeWrapper,
  QRPreview,
  ScannerBox,
  SearchResultItem,
  SearchResults,
  SelectedPersonCard,
  SelectedPersonHeader,
  SelectedPersonName,
  StatusCard,
  StatusIconWrapper,
  StatusText,
  SubmitButton,
  Tab,
  TabIcon,
  Tabs,
  Title,
  PopupOverlay,
  PopupCard,
  Avatar,
  PersonMeta as PersonMetaStyled,
  StatusBadge,
  CancelButton,
  PersonInfoPopup,
  ConfirmTitle,
  ConfirmSubtitle,
  ConfirmButtons,
  ConfirmButton,
  CloseIcon,
} from './Scanner.styles'

export function Scanner() {
  const [confirmAction, setConfirmAction] = useState<'entry' | 'exit' | null>(null)
  const [manualConfirmData, setManualConfirmData] = useState<{ person: any; action: 'entry' | 'exit' } | null>(null)
  const navigate = useNavigate()

  const scanner = useScanner('scan')
  const { pendingScan, showPopup, result } = scanner

  const handleConfirm = async (type: 'entry' | 'exit') => {
    if (!pendingScan) return
    try {
      const data = await api.scan.process(pendingScan.personId, type)
      const newStatus = type === 'entry' ? 'inside' : 'outside'
      scanner.setResult({ 
        success: true, 
        message: data.message, 
        person: data.person,
        status: newStatus 
      })
      scanner.setPendingScan(null)
      scanner.setShowPopup(false)
      setConfirmAction(null)
    } catch (err: any) {
      scanner.setResult({ success: false, message: err.message })
      scanner.setPendingScan(null)
      scanner.setShowPopup(false)
      setConfirmAction(null)
    }
  }

  const handleClosePopup = () => {
    scanner.setPendingScan(null)
    scanner.setShowPopup(false)
  }

  const handleManualConfirm = async () => {
    if (!manualConfirmData) return
    try {
      const data = await api.scan.process(manualConfirmData.person.id, manualConfirmData.action)
      scanner.setResult({ 
        success: true, 
        message: data.message, 
        person: data.person 
      })
      scanner.setSelectedPerson(null)
      setManualConfirmData(null)
    } catch (err: any) {
      scanner.setResult({ success: false, message: err.message })
      setManualConfirmData(null)
    }
  }

  return (
    <Container>
      <Header>
        <Title>Escanear QR</Title>
        <BackButton onClick={() => navigate(-1)}>
          <Icons.arrowLeft size={20} />
        </BackButton>
      </Header>

      <Tabs>
        <Tab $active={scanner.mode === 'scan'} onClick={() => scanner.setMode('scan')}>
          <TabIcon><Icons.camera size={18} /></TabIcon>
          Cámara
        </Tab>

        <Tab $active={scanner.mode === 'manual'} onClick={() => scanner.setMode('manual')}>
          Manual
        </Tab>

        <Tab $active={scanner.mode === 'preview'} onClick={() => scanner.setMode('preview')}>
          <TabIcon><Icons.document size={18} /></TabIcon>
          Credencial
        </Tab>
      </Tabs>

      {scanner.mode === 'scan' && (
        <>
          <ScannerBox>
            <div id="qr-reader" style={{ width: '100%', height: '100%' }} />
          </ScannerBox>

          {result && (
            <StatusCard $success={result.success}>
              <StatusIconWrapper $success={result.success}>
                {result.success ? <Icons.checkCircle size={56} /> : <Icons.xCircle size={56} />}
              </StatusIconWrapper>

              <StatusText $success={result.success}>
                {result.message}
              </StatusText>

              {result.person && (
                <StatusText $success={result.success}>
                  {result.person.first_name} {result.person.last_name}
                </StatusText>
              )}

              <Button onClick={scanner.reset}>Escanear otro</Button>
            </StatusCard>
          )}
        </>
      )}

      {scanner.mode === 'manual' && (
        <>
          <ManualCard>
            {!scanner.selectedPerson ? (
              <>
                <Input
                  placeholder="Buscar por DNI, nombre o apellido"
                  value={scanner.searchQuery}
                  onChange={(e) => scanner.handleSearch(e.target.value)}
                  autoFocus
                />

                {scanner.searchQuery.length > 0 && (
                  <SearchResults>
                    {scanner.searching ? (
                      <NoResults>Buscando...</NoResults>
                    ) : scanner.searchResults.length > 0 ? (
                      scanner.searchResults.map((person) => (
                        <SearchResultItem key={person.id} onClick={() => scanner.handleSelectPerson(person)}>
                          <PersonAvatar $src={person.photo_url}>
                            {!person.photo_url && <span>{person.first_name?.charAt(0)}</span>}
                          </PersonAvatar>

                          <PersonDetails>
                            <PersonNameResult>
                              {person.last_name} {person.first_name}
                            </PersonNameResult>
                            <PersonMetaResult>
                              {person.dni ? `DNI: ${person.dni}` : 'Sin DNI'}
                            </PersonMetaResult>
                          </PersonDetails>
                        </SearchResultItem>
                      ))
                    ) : (
                      <NoResults>No se encontraron resultados</NoResults>
                    )}
                  </SearchResults>
                )}

                {scanner.searchResults.length === 0 && scanner.searchQuery.length >= 2 && !scanner.searching && (
                  <>
                    <NoResults>No se encontraron personas</NoResults>
                    <AddNewPersonButton onClick={() => scanner.setShowNewPerson(true)}>
                      + Crear nueva persona
                    </AddNewPersonButton>
                  </>
                )}
              </>
            ) : (
              <>
                <SelectedPersonCard>
                  <SelectedPersonHeader>
                    <PersonAvatar $src={scanner.selectedPerson.photo_url} style={{ width: 60, height: 60 }}>
                      {!scanner.selectedPerson.photo_url && <span>{scanner.selectedPerson.first_name?.charAt(0)}</span>}
                    </PersonAvatar>
                    <div>
                      <SelectedPersonName>
                        {scanner.selectedPerson.last_name} {scanner.selectedPerson.first_name}
                      </SelectedPersonName>
                      <PersonMetaResult>
                        {scanner.selectedPerson.dni ? `DNI: ${scanner.selectedPerson.dni}` : 'Sin DNI'}
                      </PersonMetaResult>
                    </div>
                  </SelectedPersonHeader>
                  <ClearButton onClick={() => scanner.setSelectedPerson(null)}>Cambiar persona</ClearButton>
                </SelectedPersonCard>

                <ActionButtons>
                  <ActionButton $entry onClick={() => setManualConfirmData({ person: scanner.selectedPerson, action: 'entry' })}>
                    Registrar Entrada
                  </ActionButton>
                  <ActionButton onClick={() => setManualConfirmData({ person: scanner.selectedPerson, action: 'exit' })}>
                    Registrar Salida
                  </ActionButton>
                </ActionButtons>
              </>
            )}

            {scanner.showNewPerson && (
              <NewPersonForm onSubmit={scanner.handleCreatePerson}>
                <FormTitle>Nueva Persona</FormTitle>

                <FormRow>
                  <FormInput
                    placeholder="Nombre"
                    value={scanner.newPersonData.first_name}
                    onChange={(e) => scanner.setNewPersonData({ ...scanner.newPersonData, first_name: e.target.value })}
                  />

                  <FormInput
                    placeholder="Apellido"
                    value={scanner.newPersonData.last_name}
                    onChange={(e) => scanner.setNewPersonData({ ...scanner.newPersonData, last_name: e.target.value })}
                  />
                </FormRow>

                <FormInput
                  placeholder="DNI"
                  value={scanner.newPersonData.dni}
                  onChange={(e) => scanner.setNewPersonData({ ...scanner.newPersonData, dni: e.target.value })}
                />

                <FormButtons>
                  <FormCancelButton onClick={() => scanner.setShowNewPerson(false)}>
                    Cancelar
                  </FormCancelButton>

                  <FormSaveButton type="submit" disabled={scanner.savingPerson}>
                    {scanner.savingPerson ? 'Guardando...' : 'Guardar'}
                  </FormSaveButton>
                </FormButtons>
              </NewPersonForm>
            )}
          </ManualCard>
        </>
      )}

      {scanner.mode === 'preview' && (
        <ManualCard>
          <form onSubmit={scanner.handlePreviewSubmit}>
            <Input
              placeholder="ID persona"
              value={scanner.previewId}
              onChange={(e) => scanner.setPreviewId(e.target.value)}
            />

            <SubmitButton type="submit">Ver credencial</SubmitButton>
          </form>

          {scanner.showPreview && (
            <QRPreview>
              <QRCodeWrapper>
                <QRCodeSVG value={scanner.previewId} size={200} />
              </QRCodeWrapper>

              <PersonName>ID: {scanner.previewId}</PersonName>
            </QRPreview>
          )}
        </ManualCard>
      )}

      {showPopup && pendingScan && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupCard onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={handleClosePopup}>
              <Icons.x size={18} />
            </CloseIcon>
            
            <PersonInfoPopup>
              <Avatar $src={pendingScan.person?.photo_url}>
                {!pendingScan.person?.photo_url && pendingScan.person?.first_name?.charAt(0)}
              </Avatar>
              <PersonName>
                {pendingScan.person?.last_name} {pendingScan.person?.first_name}
              </PersonName>
              {pendingScan.person?.dni && (
                <PersonMetaStyled>DNI: {pendingScan.person.dni}</PersonMetaStyled>
              )}
            </PersonInfoPopup>

            <StatusBadge $type={pendingScan.status === 'inside' ? 'out' : 'in'}>
              {pendingScan.status === 'inside' ? 'Dentro del edificio' : 'Fuera del edificio'}
            </StatusBadge>

            {pendingScan.status === 'outside' ? (
              <>
                <ConfirmTitle>Registrar Entrada</ConfirmTitle>
                <ConfirmSubtitle>¿Deseas registrar el ingreso de esta persona?</ConfirmSubtitle>
                <ConfirmButtons>
                  <ConfirmButton $variant="in" onClick={() => handleConfirm('entry')}>
                    Confirmar Check IN
                  </ConfirmButton>
                </ConfirmButtons>
              </>
            ) : (
              <>
                <ConfirmTitle>Registrar Salida</ConfirmTitle>
                <ConfirmSubtitle>¿Deseas registrar la salida de esta persona?</ConfirmSubtitle>
                <ConfirmButtons>
                  <ConfirmButton $variant="out" onClick={() => handleConfirm('exit')}>
                    Confirmar Check OUT
                  </ConfirmButton>
                </ConfirmButtons>
              </>
            )}

            <CancelButton onClick={handleClosePopup}>
              Cancelar
            </CancelButton>
          </PopupCard>
        </PopupOverlay>
      )}

      {manualConfirmData && (
        <PopupOverlay onClick={() => setManualConfirmData(null)}>
          <PopupCard onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={() => setManualConfirmData(null)}>
              <Icons.x size={18} />
            </CloseIcon>
            
            <PersonInfoPopup>
              <Avatar $src={manualConfirmData.person.photo_url}>
                {!manualConfirmData.person.photo_url && manualConfirmData.person.first_name?.charAt(0)}
              </Avatar>
              <PersonName>
                {manualConfirmData.person.last_name} {manualConfirmData.person.first_name}
              </PersonName>
              {manualConfirmData.person.dni && (
                <PersonMetaStyled>DNI: {manualConfirmData.person.dni}</PersonMetaStyled>
              )}
            </PersonInfoPopup>

            <ConfirmTitle>Confirmar {manualConfirmData.action === 'entry' ? 'entrada' : 'salida'}</ConfirmTitle>
            <ConfirmSubtitle>
              {manualConfirmData.action === 'entry' 
                ? '¿Estás seguro que deseas registrar la entrada de esta persona?' 
                : '¿Estás seguro que deseas registrar la salida de esta persona?'}
            </ConfirmSubtitle>

            <ConfirmButtons>
              <ConfirmButton onClick={() => setManualConfirmData(null)}>
                Cancelar
              </ConfirmButton>
              <ConfirmButton $variant={manualConfirmData.action === 'entry' ? 'in' : 'out'} onClick={handleManualConfirm}>
                Confirmar
              </ConfirmButton>
            </ConfirmButtons>
          </PopupCard>
        </PopupOverlay>
      )}
    </Container>
  )
}