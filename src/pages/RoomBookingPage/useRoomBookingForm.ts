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

  const filterErrorMessage = (() => {
    if (formState.errors.date != undefined) {
      return formState.errors.date.message ?? null;
    }
    if (formState.errors.attendees != undefined) {
      return formState.errors.attendees.message ?? null;
    }

    const hasStartTime = startTime !== '';
    const hasEndTime = endTime !== '';

    if (hasStartTime !== hasEndTime) {
      return '시작 시간과 종료 시간을 선택해주세요.';
    }
    if (hasTimeInputs && endTime <= startTime) {
      return '종료 시간은 시작 시간보다 늦어야 합니다.';
    }

    return null;
  })();

  const isFilterComplete = hasTimeInputs && filterErrorMessage === null;

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
    filterErrorMessage,
  };
}
