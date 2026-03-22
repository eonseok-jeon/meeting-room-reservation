import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { colors } from '_tosslib/constants/colors';

export function RoomBookingBackLink() {
  return (
    <Link
      to="/"
      css={css`
        display: block;
        width: fit-content;
        margin: 0 24px;
        padding: 12px 0 0;
        border-radius: 18px;
      `}
    >
      <button
        aria-label="뒤로가기"
        css={css`
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 14px;
          color: ${colors.grey600};

          &:hover {
            color: ${colors.grey900};
          }
        `}
      >
        ← 예약 현황으로
      </button>
    </Link>
  );
}
