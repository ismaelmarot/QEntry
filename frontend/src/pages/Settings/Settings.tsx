import { Icons } from '@/icons'
import { useSettings } from './useSettings'
import {
  AddButton,
  CategoryColor,
  CategoryInfo,
  CategoryItem,
  CategoryList,
  CategoryName,
  Container,
  DeleteButton,
  Header,
  Input,
  Popup,
  PopupButton,
  PopupButtons,
  PopupContent,
  PopupText,
  PopupTitle,
  Section,
  SectionTitle,
  Select,
  SettingLabel,
  SettingRow,
  Title,
  Toggle
} from './Settings.styles'


export function Settings() {
  const {
    darkMode,
    language,
    categories,
    showAddCategory,
    newCategoryName,
    newCategoryColor,
    deleteCategory,

    setDarkMode,
    setLanguage,
    setShowAddCategory,
    setNewCategoryName,
    setNewCategoryColor,
    setDeleteCategory,

    handleAddCategory,
    handleDeleteCategory,
  } = useSettings()

  return (
    <Container>
      <Header>
        <Title>Configuración</Title>
      </Header>

      {/* Categories */}
      <Section>
        <SectionTitle>Categorías</SectionTitle>
        <CategoryList>
          {categories.map((cat) => (
            <CategoryItem key={cat.id}>
              <CategoryInfo>
                <CategoryColor $color={cat.color} />
                <CategoryName>{cat.name}</CategoryName>
              </CategoryInfo>

              {cat.id !== 'uncategorized' && (
                <DeleteButton onClick={() => setDeleteCategory(cat)}>
                  <Icons.trash size={16} />
                </DeleteButton>
              )}
            </CategoryItem>
          ))}

          {showAddCategory ? (
            <CategoryItem>
              <Input
                placeholder="Nombre de categoría"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                autoFocus
              />
              <input
                type='color'
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                style={{
                  marginLeft: '10px',
                  width: '32px',
                  height: '32px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              />
            </CategoryItem>
          ) : (
            <AddButton onClick={() => setShowAddCategory(true)}>
              <Icons.plus size={20} />
              Agregar categoría
            </AddButton>
          )}

          {showAddCategory && (
            <PopupButtons>
              <PopupButton onClick={() => setShowAddCategory(false)}>
                Cancelar
              </PopupButton>
              <PopupButton onClick={handleAddCategory}>
                Agregar
              </PopupButton>
            </PopupButtons>
          )}
        </CategoryList>
      </Section>

      {/* Appearance */}
      <Section>
        <SectionTitle>Apariencia</SectionTitle>
        <SettingRow>
          <SettingLabel>Modo oscuro</SettingLabel>
          <Toggle $active={darkMode} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <Icons.moon
                size={18}
                style={{
                  position: 'absolute',
                  left: '6px',
                  top: '6px',
                  color: '#fff'
                }}
              />
            ) : (
              <Icons.sun
                size={18}
                style={{
                  position: 'absolute',
                  left: '6px',
                  top: '6px',
                  color: '#8E8E93'
                }}
              />
            )}
          </Toggle>
        </SettingRow>
      </Section>

      {/* Lenguage */}
      <Section>
        <SectionTitle>Idioma</SectionTitle>
        <SettingRow>
          <SettingLabel>Idioma de la app</SettingLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </Select>
        </SettingRow>
      </Section>

      {/* Popup delete */}
      {deleteCategory && (
        <Popup onClick={() => setDeleteCategory(null)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupTitle>Eliminar categoría</PopupTitle>
            <PopupText>
              ¿Estás seguro de que deseas eliminar "{deleteCategory.name}"?
            </PopupText>

            <PopupButtons>
              <PopupButton onClick={() => setDeleteCategory(null)}>
                Cancelar
              </PopupButton>
              <PopupButton $danger onClick={handleDeleteCategory}>
                Eliminar
              </PopupButton>
            </PopupButtons>
          </PopupContent>
        </Popup>
      )}
    </Container>
  )
}