import { css, keyframes } from '@emotion/react';
import { useState } from 'react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipmentLabels';
import { useSuspenseQueries } from '@tanstack/react-query';
import { SectionHeader } from 'components/SectionHeader';
import { getReservationsQueryOptions, getRoomsQueryOptions } from 'pages/queryOptions';

interface Room {
  id: string;
  name: string;
}

interface Reservation {
  id: string;
  roomId: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}

const TIME_SLOTS: string[] = [];
for (let hour = 9; hour <= 20; hour += 1) {
  TIME_SLOTS.push(`${String(hour).padStart(2, '0')}:00`);
  if (hour < 20) {
    TIME_SLOTS.push(`${String(hour).padStart(2, '0')}:30`);
  }
}

const HOUR_LABELS = TIME_SLOTS.filter(time => {
  return time.endsWith(':00');
});
const TIMELINE_START = 9;
const TIMELINE_END = 20;
const TOTAL_MINUTES = (TIMELINE_END - TIMELINE_START) * 60;

function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return (hour - TIMELINE_START) * 60 + minute;
}

export function DailyReservationTimelineSection({ date }: { date: string }) {
  const [activeReservation, setActiveReservation] = useState<string | null>(null);

  const [{ data: rooms }, { data: reservations }] = useSuspenseQueries({
    queries: [getRoomsQueryOptions(), getReservationsQueryOptions(date)],
  });

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="예약 현황" />

      <div
        css={css`
          background: ${colors.grey50};
          border-radius: 14px;
          padding: 16px;
        `}
      >
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

        {rooms.map((room, index) => {
          const roomReservations = reservations.filter(reservation => {
            return reservation.roomId === room.id;
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
                {roomReservations.map(reservation => {
                  const left = (timeToMinutes(reservation.start) / TOTAL_MINUTES) * 100;
                  const width =
                    ((timeToMinutes(reservation.end) - timeToMinutes(reservation.start)) / TOTAL_MINUTES) * 100;
                  const isActive = activeReservation === reservation.id;

                  return (
                    <div
                      key={reservation.id}
                      css={css`
                        position: absolute;
                        left: ${left}%;
                        width: ${width}%;
                        height: 100%;
                      `}
                    >
                      <div
                        role="button"
                        aria-label={`${room.name} ${reservation.start}-${reservation.end} 예약 상세`}
                        onClick={() => {
                          if (isActive) {
                            setActiveReservation(null);
                            return;
                          }
                          setActiveReservation(reservation.id);
                        }}
                        css={css`
                          width: 100%;
                          height: 100%;
                          background: ${colors.blue400};
                          border-radius: 4px;
                          opacity: ${isActive ? 1 : 0.75};
                          cursor: pointer;
                          transition: opacity 0.15s;
                          &:hover {
                            opacity: 1;
                          }
                        `}
                      />
                      {isActive && (
                        <div
                          role="tooltip"
                          css={css`
                            position: absolute;
                            top: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            margin-top: 6px;
                            background: ${colors.grey900};
                            color: ${colors.white};
                            padding: 8px 12px;
                            border-radius: 8px;
                            font-size: 12px;
                            white-space: nowrap;
                            z-index: 10;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
                            line-height: 1.6;
                          `}
                        >
                          <div>
                            {reservation.start} ~ {reservation.end}
                          </div>
                          <div>{reservation.attendees}명</div>
                          {reservation.equipment.length > 0 && (
                            <div>{reservation.equipment.map(equipment => EQUIPMENT_LABELS[equipment]).join(', ')}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

DailyReservationTimelineSection.Skeleton = () => {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="예약 현황" />
      <div
        css={css`
          background: ${colors.grey50};
          border-radius: 14px;
          padding: 16px;
        `}
      >
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
              display: flex;
              justify-content: space-between;
            `}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                css={css`
                  width: 18px;
                  height: 10px;
                  border-radius: 999px;
                  background: ${colors.grey200};
                  animation: ${skeletonPulse} 1.2s ease-in-out infinite;
                  animation-delay: ${index * 0.08}s;
                `}
              />
            ))}
          </div>
        </div>

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
      </div>
    </div>
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

/** 에러 시 아무것도 안 보이게 하기 */
DailyReservationTimelineSection.Error = () => {
  return <></>;
};
