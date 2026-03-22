import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '_tosslib/components';
import { createReservation } from 'pages/remotes';
import { RoomBookingFormValues } from './schema';

export function RoomBookingSubmitButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { handleSubmit, setError, setValue } = useFormContext<RoomBookingFormValues>();

  const { mutateAsync: createReservationMutation, isLoading: isCreatingReservation } = useMutation(
    (data: { roomId: string; date: string; start: string; end: string; attendees: number; equipment: string[] }) =>
      createReservation(data),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(['reservations', variables.date]);
        queryClient.invalidateQueries(['myReservations']);
      },
    }
  );

  const submitBooking = async (values: RoomBookingFormValues) => {
    try {
      const result = await createReservationMutation({
        roomId: values.selectedRoomId,
        date: values.date,
        start: values.startTime,
        end: values.endTime,
        attendees: values.attendees,
        equipment: values.equipment,
      });

      if ('ok' in result && result.ok) {
        navigate('/', { state: { message: '예약이 완료되었습니다!' } });
        return;
      }

      const errorResult = result as { message?: string };
      setError('root', { message: errorResult.message ?? '예약에 실패했습니다.' });
      setValue('selectedRoomId', '');
    } catch (error: unknown) {
      let serverMessage = '예약에 실패했습니다.';

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }

      setError('root', { message: serverMessage });
      setValue('selectedRoomId', '');
    }
  };

  return (
    <Button display="full" onClick={handleSubmit(submitBooking)} disabled={isCreatingReservation}>
      {isCreatingReservation ? '예약 중...' : '확정'}
    </Button>
  );
}
