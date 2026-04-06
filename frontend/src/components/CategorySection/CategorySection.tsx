import { Icons } from '@/icons'
import {
  AddButton,
  CategoryColor,
  CategoryInfo,
  CategoryItem,
  CategoryList,
  CategoryName,
  Input,
  PopupButtons,
  PopupButton,
  Section,
  SectionTitle
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
              <button onClick={() => setDeleteCategory(cat)}>
                <Icons.trash size={16} />
              </button>
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
            <input
              type="color"
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