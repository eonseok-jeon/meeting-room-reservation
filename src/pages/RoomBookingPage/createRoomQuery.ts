import { Room } from './types';

interface Reservation {
  roomId: string;
  date: string;
  start: string;
  end: string;
}

function createRoomChain(rooms: Room[]) {
  return {
    rooms,

    filterByCapacity: (attendees: number) => {
      return createRoomChain(rooms.filter(room => room.capacity >= attendees));
    },

    filterByEquipment: (required: string[]) =>
      createRoomChain(rooms.filter(room => required.every(item => room.equipment.includes(item)))),

    filterByFloor: (preferredFloor: number | null) => {
      if (preferredFloor === null) {
        return createRoomChain(rooms);
      }
      return createRoomChain(rooms.filter(room => room.floor === preferredFloor));
    },

    filterByTimeConflict: (params: {
      reservations: Reservation[];
      date: string;
      startTime: string;
      endTime: string;
    }) => {
      return createRoomChain(
        rooms.filter(room => {
          const hasConflict = params.reservations.some(
            reservation =>
              reservation.roomId === room.id &&
              reservation.date === params.date &&
              reservation.start < params.endTime &&
              reservation.end > params.startTime
          );

          return hasConflict === false;
        })
      );
    },

    sortByFloorAndName: () => {
      return createRoomChain(
        [...rooms].sort((a, b) => {
          if (a.floor !== b.floor) {
            return a.floor - b.floor;
          }

          return a.name.localeCompare(b.name);
        })
      );
    },
  };
}

export function createRoomQuery(rooms: Room[]) {
  return createRoomChain([...rooms]);
}
