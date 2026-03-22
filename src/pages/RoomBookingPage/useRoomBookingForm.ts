import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { RoomBookingFormValues, roomBookingFormSchema } from './schema';
import { createRoomBookingSearchParams, readRoomBookingFilters } from './roomBookingSearchParams';

export function useRoomBookingForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilters = readRoomBookingFilters(searchParams);

  const form = useForm<RoomBookingFormValues>({
    resolver: zodResolver(roomBookingFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...initialFilters,
      selectedRoomId: '',
    },
  });

  const { watch, formState } = form;
  const date = watch('date');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const attendees = watch('attendees');
  const equipment = watch('equipment');
  const preferredFloor = watch('preferredFloor');

  const hasTimeInputs = startTime !== '' && endTime !== '';
  const hasFilterErrors =
    formState.errors.date != undefined ||
    formState.errors.startTime != undefined ||
    formState.errors.endTime != undefined ||
    formState.errors.attendees != undefined;
  const isFilterComplete = hasTimeInputs && hasFilterErrors === false;

  useEffect(() => {
    const nextSearchParams = createRoomBookingSearchParams({
      date,
      startTime,
      endTime,
      attendees,
      equipment,
      preferredFloor,
    });

    if (nextSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [date, startTime, endTime, attendees, equipment, preferredFloor, searchParams, setSearchParams]);

  return {
    form,
    isFilterComplete,
  };
}
