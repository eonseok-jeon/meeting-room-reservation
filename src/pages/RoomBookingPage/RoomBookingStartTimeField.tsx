import { Select } from '_tosslib/components';
import { TIME_SLOTS } from './constants';
import { RoomBookingField } from './RoomBookingField';
import { useRoomBookingSearchParams } from './useRoomBookingSearchParams';

export function RoomBookingStartTimeField() {
  const { setStartTime, startTime } = useRoomBookingSearchParams();

  return (
    <RoomBookingField label="시작 시간">
      <Select value={startTime} onChange={event => setStartTime(event.target.value)} aria-label="시작 시간">
        <option value="">선택</option>
        {TIME_SLOTS.slice(0, -1).map(time => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
    </RoomBookingField>
  );
}
