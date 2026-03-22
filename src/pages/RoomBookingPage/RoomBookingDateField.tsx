import { useFormContext } from 'react-hook-form';
import { formatDate } from 'utils/formatDate';
import { RoomBookingField, roomBookingInputCss } from './RoomBookingField';
import { RoomBookingFormValues } from './schema';

export function RoomBookingDateField() {
  const { register } = useFormContext<RoomBookingFormValues>();

  return (
    <RoomBookingField label="날짜">
      <input
        type="date"
        min={formatDate(new Date())}
        aria-label="날짜"
        css={roomBookingInputCss}
        {...register('date')}
      />
    </RoomBookingField>
  );
}
