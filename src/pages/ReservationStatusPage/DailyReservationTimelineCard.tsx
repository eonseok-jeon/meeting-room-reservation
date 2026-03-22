import { css } from '@emotion/react';
import { Suspense } from 'react';
import { colors } from '_tosslib/constants/colors';
import { DailyReservationTimelineHourLabels } from './DailyReservationTimelineHourLabels';
import { DailyReservationTimelineRows } from './DailyReservationTimelineRows';

interface DailyReservationTimelineCardProps {
  date: string;
}

export function DailyReservationTimelineCard({ date }: DailyReservationTimelineCardProps) {
  return (
    <div
      css={css`
        background: ${colors.grey50};
        border-radius: 14px;
        padding: 16px;
      `}
    >
      <DailyReservationTimelineHourLabels />
      <Suspense fallback={<DailyReservationTimelineRows.Skeleton />}>
        <DailyReservationTimelineRows date={date} />
      </Suspense>
    </div>
  );
}
