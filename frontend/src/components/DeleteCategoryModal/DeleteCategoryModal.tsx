import {
    Popup,
    PopupContent,
    PopupTitle,
    PopupText,
    PopupButtons,
    PopupButton
} from './DeteteCategoryModal.styles'

export function DeleteCategoryModal({
    deleteCategory,
    setDeleteCategory,
    handleDeleteCategory
}: any) {
    if (!deleteCategory) return null

    return (
        <Popup onClick={() => setDeleteCategory(null)}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
                <PopupTitle>Eliminar categoría</PopupTitle>

                <PopupText>
                    ¿Eliminar "{deleteCategory.name}"?
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
    )
}