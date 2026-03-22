import { css } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { SectionHeader } from 'components/SectionHeader';
import { getReservationsQueryOptions } from 'pages/queryOptions';
import { RoomBookingAvailableRoomsList } from './RoomBookingAvailableRoomsList';
import { Room } from './types';
import { useRoomBookingSearchParams } from './useRoomBookingSearchParams';

interface RoomBookingAvailableRoomsSectionProps {
  isBooking: boolean;
  onBook: () => void;
  onSelectRoom: (roomId: string) => void;
  rooms: Room[];
  selectedRoomId: string | null;
}

export function RoomBookingAvailableRoomsSection({
  isBooking,
  onBook,
  onSelectRoom,
  rooms,
  selectedRoomId,
}: RoomBookingAvailableRoomsSectionProps) {
  const { attendees, date, endTime, equipment, preferredFloor, startTime } = useRoomBookingSearchParams();

  const { data: reservations } = useSuspenseQuery(getReservationsQueryOptions(date));

  const availableRooms = rooms
    .filter(room => {
      if (room.capacity < attendees) return false;
      if (!equipment.every(selectedEquipment => room.equipment.includes(selectedEquipment))) return false;
      if (preferredFloor !== null && room.floor !== preferredFloor) return false;

      const hasConflict = reservations.some(
        reservation =>
          reservation.roomId === room.id &&
          reservation.date === date &&
          reservation.start < endTime &&
          reservation.end > startTime
      );

      if (hasConflict) return false;

      return true;
    })
    .sort((a, b) => {
      if (a.floor !== b.floor) return a.floor - b.floor;
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
        availableRooms={availableRooms}
        onSelectRoom={onSelectRoom}
        selectedRoomId={selectedRoomId}
      />

      <Spacing size={16} />
      <Button display="full" onClick={onBook} disabled={isBooking}>
        {isBooking ? '예약 중...' : '확정'}
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
