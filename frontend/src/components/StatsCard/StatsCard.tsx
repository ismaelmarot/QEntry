import { StatCardProps, SummaryCardProps } from '@/interface'
import { 
  StatCard as StatCardBase, 
  StatHeader, 
  StatIcon, 
  StatLabel, 
  StatValue, 
  StatSubtext, 
  StatsGrid as StatsGridStyled,
  SummaryRow,
  SummaryCard,
  SummaryIcon,
  SummaryValue,
  SummaryLabel
} from './StatsCard.styles'

export function StatCardComponent({ color, label, value, subtext, icon }: StatCardProps) {
  return (
    <StatCardBase $color={color}>
      <StatHeader>
        <StatIcon $color={color}>{icon}</StatIcon>
        <StatLabel>{label}</StatLabel>
      </StatHeader>
      <StatValue>{value}</StatValue>
      {subtext && <StatSubtext>{subtext}</StatSubtext>}
    </StatCardBase>
  )
}

export function SummaryCardComponent({ color, value, label, icon }: SummaryCardProps) {
  return (
    <SummaryCard>
      <SummaryIcon $color={color}>{icon}</SummaryIcon>
      <SummaryValue>{value}</SummaryValue>
      <SummaryLabel>{label}</SummaryLabel>
    </SummaryCard>
  )
}

export {
  StatsGridStyled as StatsGrid,
  SummaryRow,
  StatCardBase as StatCard,
  StatHeader,
  StatIcon,
  StatLabel,
  StatValue,
  StatSubtext,
  SummaryCard,
  SummaryIcon,
  SummaryValue,
  SummaryLabel,
}