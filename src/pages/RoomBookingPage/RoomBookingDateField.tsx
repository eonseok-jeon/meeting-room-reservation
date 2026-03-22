import { formatDate } from 'utils/formatDate';
import { RoomBookingField, roomBookingInputCss } from './RoomBookingField';
import { useRoomBookingSearchParams } from './useRoomBookingSearchParams';

export function RoomBookingDateField() {
  const { date, setDate } = useRoomBookingSearchParams();

  return (
    <RoomBookingField label="날짜">
      <input
        type="date"
        value={date}
        min={formatDate(new Date())}
        onChange={event => setDate(event.target.value)}
        aria-label="날짜"
        css={roomBookingInputCss}
      />
    </RoomBookingField>
  );
}
