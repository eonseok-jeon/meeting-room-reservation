import { css } from '@emotion/react';
import { useMutation, useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { cancelReservation } from 'pages/remotes';
import { MyReservationList } from './MyReservationList';
import { SectionHeader } from 'components/SectionHeader';
import { ReservationActionMessage } from './utils/useReservationActionMessage';
import { getMyReservationsQueryOptions, getRoomsQueryOptions } from 'pages/queryOptions';

interface Room {
  id: string;
  name: string;
}

interface MyReservationSectionProps {
  onActionMessage: (reservationActionMessage: ReservationActionMessage) => void;
}

export function MyReservationSection({ onActionMessage }: MyReservationSectionProps) {
  const [{ data: rooms }, { data: reservations }] = useSuspenseQueries({
    queries: [getRoomsQueryOptions(), getMyReservationsQueryOptions()],
  });
  const myReservationList = reservations.map(reservation => ({
    ...reservation,
    roomName: rooms.find(room => room.id === reservation.roomId)?.name ?? reservation.roomId,
  }));

  const queryClient = useQueryClient();

  const { mutateAsync: cancelReservationMutation } = useMutation(
    (reservationId: string) => cancelReservation(reservationId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reservations']);
        queryClient.invalidateQueries(['myReservations']);
        onActionMessage({ type: 'success', text: '예약이 취소되었습니다.' });
      },
      onError: () => {
        onActionMessage({ type: 'error', text: '취소에 실패했습니다.' });
      },
    }
  );

  return (
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

      <MyReservationList
        myReservationList={myReservationList}
        onCancelReservation={reservationId => {
          cancelReservationMutation(reservationId);
        }}
      />
    </div>
  );
}

MyReservationSection.Skeleton = () => {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="내 예약" />
      <div
        css={css`
          padding: 40px 0;
          text-align: center;
          background: ${colors.grey50};
          border-radius: 14px;
        `}
      >
        <Text typography="t6" color={colors.grey400}>
          예약 내역을 불러오는 중입니다.
        </Text>
      </div>
    </div>
  );
};

MyReservationSection.Error = () => {
  return <></>;
};
