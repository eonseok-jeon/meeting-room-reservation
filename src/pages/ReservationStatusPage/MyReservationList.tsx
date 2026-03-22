import { css } from '@emotion/react';
import { Button, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipmentLabels';

interface Reservation {
  id: string;
  roomName: string;
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}

interface MyReservationListProps {
  myReservationList: Reservation[];
  onCancelReservation: (reservationId: string) => void;
}

export function MyReservationList({ myReservationList, onCancelReservation }: MyReservationListProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      {myReservationList.map(reservation => {
        const equipmentNames = reservation.equipment.map(equipment => EQUIPMENT_LABELS[equipment]).join(', ');
        const hasEquipment = equipmentNames !== '';
        const equipmentText = hasEquipment ? equipmentNames : '장비 없음';

        return (
          <div
            key={reservation.id}
            css={css`
              padding: 14px 16px;
              border-radius: 14px;
              background: ${colors.grey50};
              border: 1px solid ${colors.grey200};
            `}
          >
            <ListRow
              contents={
                <ListRow.Text2Rows
                  top={reservation.roomName}
                  topProps={{ typography: 't6', fontWeight: 'bold', color: colors.grey900 }}
                  bottom={`${reservation.date} ${reservation.start}~${reservation.end} · ${reservation.attendees}명 · ${equipmentText}`}
                  bottomProps={{ typography: 't7', color: colors.grey600 }}
                />
              }
              right={
                <Button
                  type="danger"
                  style="weak"
                  size="small"
                  onClick={event => {
                    event.stopPropagation();
                    const shouldCancel = window.confirm('정말 취소하시겠습니까?');
                    if (shouldCancel) {
                      onCancelReservation(reservation.id);
                    }
                  }}
                >
                  취소
                </Button>
              }
            />
          </div>
        );
      })}
    </div>
  );
}
