import { css } from '@emotion/react';
import { Spacing } from '_tosslib/components';
import { SectionHeader } from 'components/SectionHeader';
import { RoomBookingAttendeesField } from './RoomBookingAttendeesField';
import { RoomBookingDateField } from './RoomBookingDateField';
import { RoomBookingEndTimeField } from './RoomBookingEndTimeField';
import { RoomBookingEquipmentField } from './RoomBookingEquipmentField';
import { RoomBookingPreferredFloorField } from './RoomBookingPreferredFloorField';
import { RoomBookingStartTimeField } from './RoomBookingStartTimeField';
import { Room } from './types';

interface RoomBookingConditionsSectionProps {
  rooms: Room[];
}

export function RoomBookingConditionsSection({ rooms }: RoomBookingConditionsSectionProps) {
  const floors = [...new Set(rooms.map(room => room.floor))].sort((a, b) => a - b);

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <SectionHeader title="예약 조건" />

      <RoomBookingDateField />
      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <RoomBookingStartTimeField />
        </div>
        <div
          css={css`
            flex: 1;
          `}
        >
          <RoomBookingEndTimeField />
        </div>
      </div>
      <Spacing size={14} />

      <div
        css={css`
          display: flex;
          gap: 12px;
        `}
      >
        <div
          css={css`
            flex: 1;
          `}
        >
          <RoomBookingAttendeesField />
        </div>
        <div
          css={css`
            flex: 1;
          `}
        >
          <RoomBookingPreferredFloorField floors={floors} />
        </div>
      </div>
      <Spacing size={14} />

      <RoomBookingEquipmentField />
    </div>
  );
}
