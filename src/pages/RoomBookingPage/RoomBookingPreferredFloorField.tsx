import { useController } from 'react-hook-form';
import { Select } from '_tosslib/components';
import { RoomBookingField } from './RoomBookingField';
import { RoomBookingFormValues } from './schema';

interface RoomBookingPreferredFloorFieldProps {
  floors: number[];
}

export function RoomBookingPreferredFloorField({ floors }: RoomBookingPreferredFloorFieldProps) {
  const { field } = useController<RoomBookingFormValues, 'preferredFloor'>({ name: 'preferredFloor' });

  return (
    <RoomBookingField label="선호 층">
      <Select
        value={field.value ?? ''}
        onChange={event => {
          const value = event.target.value;
          field.onChange(value === '' ? null : Number(value));
        }}
        aria-label="선호 층"
      >
        <option value="">전체</option>
        {floors.map(floor => (
          <option key={floor} value={floor}>
            {floor}층
          </option>
        ))}
      </Select>
    </RoomBookingField>
  );
}
