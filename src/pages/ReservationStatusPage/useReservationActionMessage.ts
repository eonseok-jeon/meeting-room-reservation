import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface ReservationActionMessage {
  type: 'success' | 'error';
  text: string;
}

export function useReservationActionMessage() {
  const location = useLocation();
  const locationState = location.state as { message?: string } | null;

  const [reservationActionMessage, setReservationActionMessage] = useState<ReservationActionMessage | null>(
    locationState?.message ? { type: 'success', text: locationState.message } : null
  );

  useEffect(() => {
    if (locationState?.message) {
      window.history.replaceState({}, '');
    }
  }, [locationState]);

  return [reservationActionMessage, setReservationActionMessage] as const;
}
