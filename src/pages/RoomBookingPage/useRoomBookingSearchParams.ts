import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';
import { ALL_EQUIPMENT, Equipment } from './constants';
import { RoomBookingFilters, roomBookingFiltersSchema } from './schema';

function parseDate(value: string | null) {
  const result = roomBookingFiltersSchema.shape.date.safeParse(value);

  if (result.success) {
    return result.data;
  }

  return formatDate(new Date());
}

function parseAttendees(value: string | null) {
  const parsed = Number(value);

  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed;
  }

  return 1;
}

function parsePreferredFloor(value: string | null) {
  if (value === null || value === '') {
    return null;
  }

  const parsed = Number(value);

  if (Number.isInteger(parsed)) {
    return parsed;
  }

  return null;
}

function parseEquipment(value: string | null): Equipment[] {
  if (value === null || value === '') {
    return [];
  }

  return value.split(',').filter((equipment): equipment is Equipment => ALL_EQUIPMENT.includes(equipment as Equipment));
}

export function readRoomBookingFilters(searchParams: URLSearchParams): RoomBookingFilters {
  return {
    date: parseDate(searchParams.get('date')),
    startTime: searchParams.get('startTime') ?? '',
    endTime: searchParams.get('endTime') ?? '',
    equipment: parseEquipment(searchParams.get('equipment')),
    attendees: parseAttendees(searchParams.get('attendees')),
    preferredFloor: parsePreferredFloor(searchParams.get('floor')),
  };
}

export function createRoomBookingSearchParams(filters: RoomBookingFilters) {
  const nextSearchParams = new URLSearchParams();

  nextSearchParams.set('date', filters.date);

  if (filters.startTime !== '') {
    nextSearchParams.set('startTime', filters.startTime);
  }

  if (filters.endTime !== '') {
    nextSearchParams.set('endTime', filters.endTime);
  }

  if (filters.attendees > 1) {
    nextSearchParams.set('attendees', String(filters.attendees));
  }

  if (filters.equipment.length > 0) {
    nextSearchParams.set('equipment', filters.equipment.join(','));
  }

  if (filters.preferredFloor != null) {
    nextSearchParams.set('floor', String(filters.preferredFloor));
  }

  return nextSearchParams;
}

export function useRoomBookingSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<RoomBookingFilters>(() => {
    return readRoomBookingFilters(searchParams);
  }, [searchParams]);

  const validationResult = useMemo(() => {
    return roomBookingFiltersSchema.safeParse(filters);
  }, [filters]);

  const validationError = validationResult.success ? null : validationResult.error.issues[0]?.message ?? null;
  const isFilterComplete = filters.startTime !== '' && filters.endTime !== '' && validationResult.success;

  const updateFilters = useCallback(
    (updates: Partial<RoomBookingFilters>) => {
      setSearchParams(
        createRoomBookingSearchParams({
          ...filters,
          ...updates,
        }),
        { replace: true }
      );
    },
    [filters, setSearchParams]
  );

  const toggleEquipment = useCallback(
    (equipment: Equipment) => {
      const selected = filters.equipment.includes(equipment);

      updateFilters({
        equipment: selected ? filters.equipment.filter(item => item !== equipment) : [...filters.equipment, equipment],
      });
    },
    [filters.equipment, updateFilters]
  );

  return {
    ...filters,
    isFilterComplete,
    setAttendees: (attendees: number) => updateFilters({ attendees: Math.max(1, attendees) || 1 }),
    setDate: (date: string) => updateFilters({ date }),
    setEndTime: (endTime: string) => updateFilters({ endTime }),
    setPreferredFloor: (preferredFloor: number | null) => updateFilters({ preferredFloor }),
    setStartTime: (startTime: string) => updateFilters({ startTime }),
    toggleEquipment,
    validationError,
  };
}
