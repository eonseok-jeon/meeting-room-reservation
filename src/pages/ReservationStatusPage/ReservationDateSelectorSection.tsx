import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { ReservationDateSelector } from './ReservationDateSelector';
import { formatDate } from '../../utils/formatDate';

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
      <Text typography="t5" fontWeight="bold" color={colors.grey900}>
        날짜 선택
      </Text>
      <Spacing size={16} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <ReservationDateSelector date={date} min={formatDate(new Date())} onDateChange={onDateChange} />
      </div>
    </div>
  );
}
