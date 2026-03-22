import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { SectionHeader } from 'components/SectionHeader';
import { getReservationsQueryOptions } from 'pages/queryOptions';
import { createReservation } from 'pages/remotes';
import { RoomBookingAvailableRoomsList } from './RoomBookingAvailableRoomsList';
import { RoomBookingFormValues } from './schema';
import { Room } from './types';

interface RoomBookingAvailableRoomsSectionProps {
  rooms: Room[];
}

export function RoomBookingAvailableRoomsSection({ rooms }: RoomBookingAvailableRoomsSectionProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleSubmit, setError, setValue, watch } = useFormContext<RoomBookingFormValues>();

  const date = watch('date');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const attendees = watch('attendees');
  const equipment = watch('equipment');
  const preferredFloor = watch('preferredFloor');
  const selectedRoomId = watch('selectedRoomId');

  const { data: reservations } = useSuspenseQuery(getReservationsQueryOptions(date));

  const { mutateAsync: createReservationMutation, isLoading: isCreatingReservation } = useMutation(
    (data: { roomId: string; date: string; start: string; end: string; attendees: number; equipment: string[] }) =>
      createReservation(data),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(['reservations', variables.date]);
        queryClient.invalidateQueries(['myReservations']);
      },
    }
  );

  const submitBooking = async (values: RoomBookingFormValues) => {
    try {
      const result = await createReservationMutation({
        roomId: values.selectedRoomId,
        date: values.date,
        start: values.startTime,
        end: values.endTime,
        attendees: values.attendees,
        equipment: values.equipment,
      });

      if ('ok' in result && result.ok) {
        navigate('/', { state: { message: '예약이 완료되었습니다!' } });
        return;
      }

      const errorResult = result as { message?: string };
      setError('root', { message: errorResult.message ?? '예약에 실패했습니다.' });
      setValue('selectedRoomId', '');
    } catch (error: unknown) {
      let serverMessage = '예약에 실패했습니다.';

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }

      setError('root', { message: serverMessage });
      setValue('selectedRoomId', '');
    }
  };

  const availableRooms = rooms
    .filter(room => {
      if (room.capacity < attendees) {
        return false;
      }

      const hasAllEquipment = equipment.every(selectedEquipment => room.equipment.includes(selectedEquipment));
      if (hasAllEquipment === false) {
        return false;
      }

      if (preferredFloor != null && room.floor !== preferredFloor) {
        return false;
      }

      const hasConflict = reservations.some(
        reservation =>
          reservation.roomId === room.id &&
          reservation.date === date &&
          reservation.start < endTime &&
          reservation.end > startTime
      );

      if (hasConflict) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (a.floor !== b.floor) {
        return a.floor - b.floor;
      }

      return a.name.localeCompare(b.name);
    });

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader
        title="예약 가능 회의실"
        titleAddOn={
          <Text typography="t7" fontWeight="medium" color={colors.grey500}>
            {availableRooms.length}개
          </Text>
        }
      />

      <RoomBookingAvailableRoomsList
        selectedRoomId={selectedRoomId}
        availableRooms={availableRooms}
        onSelectRoom={roomId => setValue('selectedRoomId', roomId)}
      />

      <Spacing size={16} />
      <Button display="full" onClick={handleSubmit(submitBooking)} disabled={isCreatingReservation}>
        {isCreatingReservation ? '예약 중...' : '확정'}
      </Button>
    </div>
  );
}

RoomBookingAvailableRoomsSection.Skeleton = () => {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="예약 가능 회의실" />
      <div
        css={css`
          height: 220px;
          border-radius: 14px;
          background: ${colors.grey50};
        `}
      />
    </div>
  );
};
