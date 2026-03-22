import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createRoomBookingSearchParams, readRoomBookingFilters } from './roomBookingSearchParams';

export function useCanonicalizeRoomBookingSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const normalizedSearchParams = useMemo(() => {
    return createRoomBookingSearchParams(readRoomBookingFilters(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (normalizedSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(normalizedSearchParams, { replace: true });
    }
  }, [normalizedSearchParams, searchParams, setSearchParams]);
}
