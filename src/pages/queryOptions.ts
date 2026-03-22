import { queryOptions } from '@tanstack/react-query';
import { getMyReservations, getReservations, getRooms } from './remotes';

export function getRoomsQueryOptions() {
  return queryOptions({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
}

export function getReservationsQueryOptions(date: string) {
  return queryOptions({
    queryKey: ['reservations', date],
    queryFn: () => {
      return date ? getReservations(date) : Promise.resolve([]);
    },
  });
}

export function getMyReservationsQueryOptions() {
  return queryOptions({
    queryKey: ['myReservations'],
    queryFn: getMyReservations,
  });
}
