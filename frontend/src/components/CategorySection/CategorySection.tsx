import { Icons } from '@/icons'
import {
  AddButton,
  CategoryColor,
  CategoryInfo,
  CategoryItem,
  CategoryList,
  CategoryName,
  DeleteButton,
  Input,
  PopupButtons,
  PopupButton,
  Section,
  SectionTitle,
  ColorPicker
} from './CategorySection.styles'

export function CategorySection({
  categories,
  showAddCategory,
  newCategoryName,
  newCategoryColor,
  setShowAddCategory,
  setNewCategoryName,
  setNewCategoryColor,
  setDeleteCategory,
  handleAddCategory
}: any) {
  return (
    <Section>
      <SectionTitle>Categorías</SectionTitle>

      <CategoryList>
        {categories.map((cat: any) => (
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
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de categoría"
            />
            <ColorPicker
              value={newCategoryColor}
              onChange={(e) => setNewCategoryColor(e.target.value)}
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
  )
}