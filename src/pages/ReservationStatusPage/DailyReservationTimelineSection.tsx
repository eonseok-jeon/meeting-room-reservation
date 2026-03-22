import { css, keyframes } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { SectionHeader } from 'components/SectionHeader';
import { DailyReservationTimelineCard } from './DailyReservationTimelineCard';

export function DailyReservationTimelineSection({ date }: { date: string }) {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="예약 현황" />
      <DailyReservationTimelineCard date={date} />
    </div>
  );
}

/** 에러 시 아무것도 안 보이게 하기 */
DailyReservationTimelineSection.Error = () => {
  return <></>;
};
