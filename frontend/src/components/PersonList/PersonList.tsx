import { useNavigate } from 'react-router-dom'
import { HiOutlineSearch, HiOutlinePencil, HiOutlineUser } from 'react-icons/hi'
import { formatDni } from '@/services'
import { PersonListProps } from '@/types'
import {
  ListContainer,
  SectionTitle,
  LetterSection,
  LetterHeader,
  ListItem,
  PersonInfo,
  PersonRow,
  PersonName,
  PersonAvatar,
  Type,
  ActionButton,
  PersonMeta,
  EditButton,
} from './PersonList.styles'

export function PersonList({ title, groups, getTypeColor, getTypeLabel, onEdit }: PersonListProps) {
  const navigate = useNavigate()

  if (groups.length === 0) return null

  return (
    <ListContainer>
      <SectionTitle>{title}</SectionTitle>

      {groups.map(([letter, items]) => (
        <LetterSection key={letter}>
          <LetterHeader>{letter}</LetterHeader>

          {items.map((p) => (
            <ListItem key={p.id}>
              <PersonAvatar $src={p.photo_url}>
                {p.photo_url ? (
                  <img src={p.photo_url} alt="" />
                ) : (
                  <HiOutlineUser size={24} color="#C7C7CC" />
                )}
              </PersonAvatar>
              <PersonInfo>
                <PersonRow>
                  <PersonName>
                    {p.last_name} {p.first_name}
                  </PersonName>

                  <Type $type={getTypeColor(p.type)}>
                    {getTypeLabel(p.type)}
                  </Type>

                  {onEdit && (
                    <EditButton onClick={() => onEdit(p)}>
                      <HiOutlinePencil size={16} />
                    </EditButton>
                  )}

                  <ActionButton
                    onClick={() =>
                      navigate('/persons/' + p.id, { state: { person: p } })
                    }
                  >
                    <HiOutlineSearch size={18} />
                  </ActionButton>
                </PersonRow>

                <PersonMeta>
                  {formatDni(p.dni) || 'Sin DNI'}
                  {p.role_code ? ' - ' + p.role_code : ''}
                  {p.type === 'visitor' && p.visit_reason
                    ? ' - ' + p.visit_reason
                    : ''}
                </PersonMeta>
              </PersonInfo>
            </ListItem>
          ))}
        </LetterSection>
      ))}
    </ListContainer>
  )
}