import { useFormContext } from 'react-hook-form';
import { RoomBookingField, roomBookingInputCss } from './RoomBookingField';
import { RoomBookingFormValues } from './schema';

export function RoomBookingAttendeesField() {
  const { register } = useFormContext<RoomBookingFormValues>();

  return (
    <RoomBookingField label="참석 인원">
      <input
        type="number"
        min={1}
        aria-label="참석 인원"
        css={roomBookingInputCss}
        {...register('attendees', { valueAsNumber: true })}
      />
    </RoomBookingField>
  );
}
