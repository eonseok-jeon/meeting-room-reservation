import { css } from '@emotion/react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { SelectedRoomCard, UnselectedRoomCard } from './RoomBookingRoomCard';
import { Room } from './types';

interface RoomBookingAvailableRoomsListProps {
  availableRooms: Room[];
  onSelectRoom: (roomId: string) => void;
  selectedRoomId: string;
}

export function RoomBookingAvailableRoomsList({
  availableRooms,
  onSelectRoom,
  selectedRoomId,
}: RoomBookingAvailableRoomsListProps) {
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
          return <SelectedRoomCard key={room.id} room={room} onClick={() => onSelectRoom(room.id)} />;
        }

        return <UnselectedRoomCard key={room.id} room={room} onClick={() => onSelectRoom(room.id)} />;
      })}
    </div>
  );
}
