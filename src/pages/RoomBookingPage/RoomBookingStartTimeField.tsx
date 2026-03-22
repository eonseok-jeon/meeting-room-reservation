import { useController } from 'react-hook-form';
import { Select } from '_tosslib/components';
import { TIME_SLOTS } from './constants';
import { RoomBookingField } from './RoomBookingField';
import { RoomBookingFormValues } from './schema';

export function RoomBookingStartTimeField() {
  const { field } = useController<RoomBookingFormValues, 'startTime'>({ name: 'startTime' });

  return (
    <RoomBookingField label="시작 시간">
      <Select value={field.value} onChange={event => field.onChange(event.target.value)} aria-label="시작 시간">
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
