import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getReservationsQueryOptions, getRoomsQueryOptions } from 'pages/queryOptions';
import { DailyReservationTimelineReservationBars } from './DailyReservationTimelineReservationBars';

interface DailyReservationTimelineRowsProps {
  date: string;
}

export function DailyReservationTimelineRows({ date }: DailyReservationTimelineRowsProps) {
  const [activeReservationId, setActiveReservationId] = useState<string | null>(null);

  const [{ data: rooms }, { data: reservations }] = useSuspenseQueries({
    queries: [getRoomsQueryOptions(), getReservationsQueryOptions(date)],
  });

  return (
    <>
      {rooms.map((room, index) => {
        const roomReservations = reservations
          .filter(reservation => {
            return reservation.roomId === room.id;
          })
          .map(reservation => {
            return {
              ...reservation,
              roomName: room.name,
            };
          });

        return (
          <div
            key={room.id}
            css={css`
              display: flex;
              align-items: center;
              height: 32px;
              ${index > 0 ? 'margin-top: 4px;' : ''}
            `}
          >
            <div
              css={css`
                width: 80px;
                flex-shrink: 0;
                padding-right: 8px;
              `}
            >
              <Text
                typography="t7"
                fontWeight="medium"
                color={colors.grey700}
                ellipsisAfterLines={1}
                css={css`
                  font-size: 12px;
                `}
              >
                {room.name}
              </Text>
            </div>
            <div
              css={css`
                flex: 1;
                height: 24px;
                background: ${colors.white};
                border-radius: 6px;
                position: relative;
                overflow: visible;
              `}
            >
              <DailyReservationTimelineReservationBars
                reservations={roomReservations}
                activeReservationId={activeReservationId}
                onToggleReservation={reservationId => {
                  setActiveReservationId(current => {
                    return current === reservationId ? null : reservationId;
                  });
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

DailyReservationTimelineRows.Skeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          css={css`
            display: flex;
            align-items: center;
            height: 32px;
            ${index > 0 ? 'margin-top: 4px;' : ''}
          `}
        >
          <div
            css={css`
              width: 80px;
              flex-shrink: 0;
              padding-right: 8px;
            `}
          >
            <div
              css={css`
                width: 56px;
                height: 12px;
                border-radius: 999px;
                background: ${colors.grey200};
                animation: ${skeletonPulse} 1.2s ease-in-out infinite;
                animation-delay: ${index * 0.08}s;
              `}
            />
          </div>
          <div
            css={css`
              flex: 1;
              height: 24px;
              background: ${colors.white};
              border-radius: 6px;
              position: relative;
              overflow: hidden;
            `}
          >
            <div
              css={css`
                position: absolute;
                top: 4px;
                left: ${12 + index * 11}%;
                width: ${18 + (index % 3) * 8}%;
                height: 16px;
                border-radius: 4px;
                background: ${colors.grey200};
                animation: ${skeletonPulse} 1.2s ease-in-out infinite;
                animation-delay: ${index * 0.12}s;
              `}
            />
          </div>
        </div>
      ))}
    </>
  );
};

const skeletonPulse = keyframes`
  0% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.45;
  }
`;
