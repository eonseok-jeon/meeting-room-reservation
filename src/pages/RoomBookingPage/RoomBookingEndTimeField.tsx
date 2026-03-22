import { Select } from '_tosslib/components';
import { TIME_SLOTS } from './constants';
import { RoomBookingField } from './RoomBookingField';
import { useRoomBookingSearchParams } from './useRoomBookingSearchParams';

export function RoomBookingEndTimeField() {
  const { endTime, setEndTime } = useRoomBookingSearchParams();

  return (
    <RoomBookingField label="종료 시간">
      <Select value={endTime} onChange={event => setEndTime(event.target.value)} aria-label="종료 시간">
        <option value="">선택</option>
        {TIME_SLOTS.slice(1).map(time => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>
    </RoomBookingField>
  );
}
