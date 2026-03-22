import { css } from '@emotion/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Border, Button, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { MyReservationSection } from './MyReservationSection';
import { ReservationDateSelectorSection } from './ReservationDateSelectorSection';
import { DailyReservationTimelineSection } from './DailyReservationTimelineSection';
import { ReservationTitleSection } from './ReservationTitleSection';
import { formatDate } from '../../utils/formatDate';

export function ReservationStatusPage() {
  const [date, setDate] = useState(formatDate(new Date()));

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <ReservationTitleSection />

      <Spacing size={24} />

      <ReservationDateSelectorSection date={date} onDateChange={setDate} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <DailyReservationTimelineSection date={date} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      <MyReservationSection />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {/* 예약하기 버튼 */}
      <Link
        to="/booking"
        css={css`
          display: block;
          margin: 0 24px;
          border-radius: 18px;
        `}
      >
        <Button display="full">예약하기</Button>
      </Link>
    </div>
  );
}
