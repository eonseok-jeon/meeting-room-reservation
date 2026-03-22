import { ReservationWithRoomName } from './types';
import { DailyReservationTimelineReservationBar } from './DailyReservationTimelineReservationBar';

interface DailyReservationTimelineReservationBarsProps {
  activeReservationId: string | null;
  onToggleReservation: (reservationId: string) => void;
  reservations: ReservationWithRoomName[];
}

export function DailyReservationTimelineReservationBars({
  activeReservationId,
  onToggleReservation,
  reservations,
}: DailyReservationTimelineReservationBarsProps) {
  return (
    <>
      {reservations.map(reservation => (
        <DailyReservationTimelineReservationBar
          key={reservation.id}
          reservation={reservation}
          isActive={activeReservationId === reservation.id}
          onToggle={() => onToggleReservation(reservation.id)}
        />
      ))}
    </>
  );
}
