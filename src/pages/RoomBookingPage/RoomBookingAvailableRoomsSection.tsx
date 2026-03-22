import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { SectionHeader } from 'components/SectionHeader';
import { RoomBookingAvailableRoomsList } from './RoomBookingAvailableRoomsList';
import { RoomBookingSubmitButton } from './RoomBookingSubmitButton';
import { Room } from './types';

interface RoomBookingAvailableRoomsSectionProps {
  rooms: Room[];
}

export function RoomBookingAvailableRoomsSection({ rooms }: RoomBookingAvailableRoomsSectionProps) {
  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="예약 가능 회의실" />

      <RoomBookingAvailableRoomsList rooms={rooms} />

      <Spacing size={16} />
      <RoomBookingSubmitButton />
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
