export interface Room {
  id: string;
  name: string;
}

export interface Reservation {
  id: string;
  roomId: string;
  start: string;
  end: string;
  attendees: number;
  equipment: string[];
}

export interface ReservationWithRoomName extends Reservation {
  roomName: string;
}
