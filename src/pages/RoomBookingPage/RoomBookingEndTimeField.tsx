import { useController } from 'react-hook-form';
import { Select } from '_tosslib/components';
import { TIME_SLOTS } from './constants';
import { RoomBookingField } from './RoomBookingField';
import { RoomBookingFormValues } from './schema';

export function RoomBookingEndTimeField() {
  const { field } = useController<RoomBookingFormValues, 'endTime'>({ name: 'endTime' });

  return (
    <RoomBookingField label="종료 시간">
      <Select value={field.value} onChange={event => field.onChange(event.target.value)} aria-label="종료 시간">
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
