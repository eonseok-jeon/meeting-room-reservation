import { css } from '@emotion/react';
import { ReservationDateSelector } from './ReservationDateSelector';
import { formatDate } from '../../utils/formatDate';
import { SectionHeader } from 'components/SectionHeader';

interface ReservationDateSelectorSectionProps {
  date: string;
  onDateChange: (date: string) => void;
}

export function ReservationDateSelectorSection({ date, onDateChange }: ReservationDateSelectorSectionProps) {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="날짜 선택" />

      <ReservationDateSelector date={date} min={formatDate(new Date())} onDateChange={onDateChange} />
    </div>
  );
}
