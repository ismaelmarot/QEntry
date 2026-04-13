import { useSearchParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Icons } from '@/constants'
import { useScanner } from './useScanner'

import {
  ActionButton,
  ActionButtons,
  AddNewPersonButton,
  Button,
  ClearButton,
  Container,
  FormButtons,
  FormCancelButton,
  FormInput,
  FormRow,
  FormSaveButton,
  FormTitle,
  Input,
  ManualCard,
  NewPersonForm,
  NoResults,
  PersonAvatar,
  PersonDetails,
  PersonInfo,
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
  Title
} from './Scanner.styles'

export function Scanner() {
  const [searchParams] = useSearchParams()

  const initialMode =
    searchParams.get('mode') === 'manual'
      ? 'manual'
      : searchParams.get('mode') === 'preview'
      ? 'preview'
      : 'scan'

  const scanner = useScanner(initialMode)

  return (
    <Container>
      <Title>Escanear QR</Title>

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

      {/* SCAN */}
      {scanner.mode === 'scan' && (
        <>
          <ScannerBox>
            <div id="qr-reader" style={{ width: '100%', height: '100%' }} />
          </ScannerBox>

          {scanner.result && (
            <StatusCard $success={scanner.result.success}>
              <StatusIconWrapper $success={scanner.result.success}>
                {scanner.result.success ? <Icons.checkCircle size={56} /> : <Icons.xCircle size={56} />}
              </StatusIconWrapper>

              <StatusText $success={scanner.result.success}>
                {scanner.result.message}
              </StatusText>

              {scanner.result.person && (
                <PersonInfo>
                  {scanner.result.person.first_name} {scanner.result.person.last_name}
                </PersonInfo>
              )}

              <Button onClick={scanner.reset}>Escanear otro</Button>
            </StatusCard>
          )}
        </>
      )}

      {/* MANUAL */}
      {scanner.mode === 'manual' && (
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

              {scanner.searchQuery.length >= 2 && !scanner.showNewPerson && (
                <AddNewPersonButton onClick={() => scanner.setShowNewPerson(true)}>
                  + Crear nueva persona
                </AddNewPersonButton>
              )}

              {scanner.showNewPerson && (
                <NewPersonForm onSubmit={scanner.handleCreatePerson}>
                  <FormTitle>Nueva Persona</FormTitle>

                  <FormRow>
                    <FormInput
                      placeholder="Nombre"
                      value={scanner.newPersonData.first_name}
                      onChange={(e) =>
                        scanner.setNewPersonData({
                          ...scanner.newPersonData,
                          first_name: e.target.value
                        })
                      }
                    />

                    <FormInput
                      placeholder="Apellido"
                      value={scanner.newPersonData.last_name}
                      onChange={(e) =>
                        scanner.setNewPersonData({
                          ...scanner.newPersonData,
                          last_name: e.target.value
                        })
                      }
                    />
                  </FormRow>

                  <FormInput
                    placeholder="DNI"
                    value={scanner.newPersonData.dni}
                    onChange={(e) =>
                      scanner.setNewPersonData({
                        ...scanner.newPersonData,
                        dni: e.target.value
                      })
                    }
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
            </>
          ) : (
            <>
              <SelectedPersonCard>
                <SelectedPersonHeader>
                  <PersonAvatar $src={scanner.selectedPerson.photo_url} />
                  <div>
                    <SelectedPersonName>
                      {scanner.selectedPerson.last_name} {scanner.selectedPerson.first_name}
                    </SelectedPersonName>
                  </div>
                </SelectedPersonHeader>

                <ClearButton onClick={() => scanner.handleSelectPerson(null)}>
                  Cambiar persona
                </ClearButton>
              </SelectedPersonCard>

              <ActionButtons>
                <ActionButton $entry onClick={() => scanner.handleRegisterAccess('entry')}>
                  Entrada
                </ActionButton>

                <ActionButton onClick={() => scanner.handleRegisterAccess('exit')}>
                  Salida
                </ActionButton>
              </ActionButtons>
            </>
          )}
        </ManualCard>
      )}

      {/* PREVIEW */}
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
    </Container>
  )
}