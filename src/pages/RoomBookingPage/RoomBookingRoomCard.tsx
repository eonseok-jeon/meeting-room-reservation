import { css } from '@emotion/react';
import { ListRow, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipmentLabels';
import { Room } from './types';

interface RoomBookingRoomCardProps {
  room: Room;
  onClick: () => void;
}

export function SelectedRoomCard({ room, onClick }: RoomBookingRoomCardProps) {
  const equipmentText = room.equipment.map(item => EQUIPMENT_LABELS[item]).join(', ');

  return (
    <div
      onClick={onClick}
      role="button"
      aria-pressed={true}
      aria-label={room.name}
      css={css`
        cursor: pointer;
        padding: 14px 16px;
        border-radius: 14px;
        border: 2px solid ${colors.blue500};
        background: ${colors.blue50};
        transition: all 0.15s;

        &:hover {
          border-color: ${colors.blue500};
        }
      `}
    >
      <ListRow
        contents={
          <ListRow.Text2Rows
            top={room.name}
            topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
            bottom={`${room.floor}층 · ${room.capacity}명 · ${equipmentText}`}
            bottomProps={{ typography: 't7', color: colors.grey600 }}
          />
        }
        right={
          <Text typography="t7" fontWeight="bold" color={colors.blue500}>
            선택됨
          </Text>
        }
      />
    </div>
  );
}

export function UnselectedRoomCard({ room, onClick }: RoomBookingRoomCardProps) {
  const equipmentText = room.equipment.map(item => EQUIPMENT_LABELS[item]).join(', ');

  return (
    <div
      onClick={onClick}
      role="button"
      aria-pressed={false}
      aria-label={room.name}
      css={css`
        cursor: pointer;
        padding: 14px 16px;
        border-radius: 14px;
        border: 2px solid ${colors.grey200};
        background: ${colors.white};
        transition: all 0.15s;

        &:hover {
          border-color: ${colors.grey300};
        }
      `}
    >
      <ListRow
        contents={
          <ListRow.Text2Rows
            top={room.name}
            topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
            bottom={`${room.floor}층 · ${room.capacity}명 · ${equipmentText}`}
            bottomProps={{ typography: 't7', color: colors.grey600 }}
          />
        }
      />
    </div>
  );
}
