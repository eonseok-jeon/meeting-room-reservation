import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { cancelReservation, getMyReservations, getRooms } from 'pages/remotes';
import { MyReservationList } from './MyReservationList';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SectionHeader } from 'components/SectionHeader';

interface Room {
  id: string;
  name: string;
}

export function MyReservationSection() {
  const { data: rooms = [] } = useQuery(['rooms'], getRooms);
  const hasRooms = rooms.length > 0;
  const { data: myReservationList = [] } = useQuery(['myReservations'], getMyReservations, {
    enabled: hasRooms,
    select: reservations =>
      reservations.map(reservation => ({
        ...reservation,
        roomName: rooms.find(room => room.id === reservation.roomId)?.name ?? reservation.roomId,
      })),
  });

  const location = useLocation();
  const locationState = location.state as { message?: string } | null;
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

  const cancelReservationMutation = useMutation((reservationId: string) => cancelReservation(reservationId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations']);
      queryClient.invalidateQueries(['myReservations']);
    },
  });

  const queryClient = useQueryClient();

  return (
    <>
      {/* 메시지 배너 */}
      {message && (
        <div
          css={css`
            padding: 0 24px;
          `}
        >
          <div
            css={css`
              padding: 10px 14px;
              border-radius: 10px;
              background: ${message.type === 'success' ? colors.blue50 : colors.red50};
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <Text
              typography="t7"
              fontWeight="medium"
              color={message.type === 'success' ? colors.blue600 : colors.red500}
            >
              {message.text}
            </Text>
          </div>
          <Spacing size={12} />
        </div>
      )}

      <div
        css={css`
          padding: 0 24px;
        `}
      >
        <SectionHeader
          title="내 예약"
          titleAddOn={
            myReservationList.length > 0 ? (
              <Text typography="t7" fontWeight="medium" color={colors.grey500}>
                {myReservationList.length}건
              </Text>
            ) : undefined
          }
        />

        {myReservationList.length === 0 ? (
          <div
            css={css`
              padding: 40px 0;
              text-align: center;
              background: ${colors.grey50};
              border-radius: 14px;
            `}
          >
            <Text typography="t6" color={colors.grey500}>
              예약 내역이 없습니다.
            </Text>
          </div>
        ) : (
          <MyReservationList
            myReservationList={myReservationList}
            onCancelReservation={reservationId => {
              cancelReservationMutation
                .mutateAsync(reservationId)
                .then(() => {
                  setMessage({ type: 'success', text: '예약이 취소되었습니다.' });
                })
                .catch(() => {
                  setMessage({ type: 'error', text: '취소에 실패했습니다.' });
                });
            }}
          />
        )}
      </div>
    </>
  );
}
