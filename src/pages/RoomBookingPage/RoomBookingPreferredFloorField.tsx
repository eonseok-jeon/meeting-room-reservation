import { Select } from '_tosslib/components';
import { RoomBookingField } from './RoomBookingField';
import { useRoomBookingSearchParams } from './useRoomBookingSearchParams';

interface RoomBookingPreferredFloorFieldProps {
  floors: number[];
}

export function RoomBookingPreferredFloorField({ floors }: RoomBookingPreferredFloorFieldProps) {
  const { preferredFloor, setPreferredFloor } = useRoomBookingSearchParams();

  return (
    <RoomBookingField label="선호 층">
      <Select
        value={preferredFloor ?? ''}
        onChange={event => {
          const value = event.target.value;
          setPreferredFloor(value === '' ? null : Number(value));
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
