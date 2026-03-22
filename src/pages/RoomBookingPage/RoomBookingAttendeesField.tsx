import { RoomBookingField, roomBookingInputCss } from './RoomBookingField';
import { useRoomBookingSearchParams } from './useRoomBookingSearchParams';

export function RoomBookingAttendeesField() {
  const { attendees, setAttendees } = useRoomBookingSearchParams();

  return (
    <RoomBookingField label="참석 인원">
      <input
        type="number"
        min={1}
        value={attendees}
        onChange={event => setAttendees(Number(event.target.value))}
        aria-label="참석 인원"
        css={roomBookingInputCss}
      />
    </RoomBookingField>
  );
}
