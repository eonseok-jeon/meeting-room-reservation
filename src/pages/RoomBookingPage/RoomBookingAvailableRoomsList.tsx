import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { getReservationsQueryOptions } from 'pages/queryOptions';
import { SelectedRoomCard, UnselectedRoomCard } from './RoomBookingRoomCard';
import { RoomBookingFormValues } from './schema';
import { Room } from './types';
import { createRoomQuery } from './createRoomQuery';

interface RoomBookingAvailableRoomsListProps {
  rooms: Room[];
}

export function RoomBookingAvailableRoomsList({ rooms }: RoomBookingAvailableRoomsListProps) {
  const { setValue, watch } = useFormContext<RoomBookingFormValues>();

  const date = watch('date');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const attendees = watch('attendees');
  const equipment = watch('equipment');
  const preferredFloor = watch('preferredFloor');
  const selectedRoomId = watch('selectedRoomId');

  const { data: reservations } = useSuspenseQuery(getReservationsQueryOptions(date));

  const availableRooms = createRoomQuery(rooms)
    .filterByCapacity(attendees)
    .filterByEquipment(equipment)
    .filterByFloor(preferredFloor)
    .filterByTimeConflict({ reservations, date, startTime, endTime })
    .sortByFloorAndName().rooms;

  if (availableRooms.length === 0) {
    return (
      <div
        css={css`
          padding: 40px 0;
          text-align: center;
          background: ${colors.grey50};
          border-radius: 14px;
        `}
      >
        <Text typography="t6" color={colors.grey500}>
          조건에 맞는 회의실이 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {availableRooms.map(room => {
        const isSelected = selectedRoomId === room.id;

        if (isSelected) {
          return <SelectedRoomCard key={room.id} room={room} onClick={() => setValue('selectedRoomId', room.id)} />;
        }

        return <UnselectedRoomCard key={room.id} room={room} onClick={() => setValue('selectedRoomId', room.id)} />;
      })}
    </div>
  );
}
