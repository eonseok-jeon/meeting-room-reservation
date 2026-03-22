import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { HOUR_LABELS, TOTAL_MINUTES } from './constants/constants';
import { timeToMinutes } from './utils/formatTime';

export function DailyReservationTimelineHourLabels() {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-end;
        margin-bottom: 8px;
      `}
    >
      <div
        css={css`
          width: 80px;
          flex-shrink: 0;
          padding-right: 8px;
        `}
      />
      <div
        css={css`
          flex: 1;
          position: relative;
          height: 18px;
        `}
      >
        {HOUR_LABELS.map(time => {
          const left = (timeToMinutes(time) / TOTAL_MINUTES) * 100;
          return (
            <Text
              key={time}
              typography="t7"
              fontWeight="regular"
              color={colors.grey400}
              css={css`
                position: absolute;
                left: ${left}%;
                transform: translateX(-50%);
                font-size: 10px;
                letter-spacing: -0.3px;
              `}
            >
              {time.slice(0, 2)}
            </Text>
          );
        })}
      </div>
    </div>
  );
}
