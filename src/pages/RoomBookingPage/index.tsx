import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RoomBookingPageContent } from './RoomBookingPageContent';
import { useNormalizeRoomBookingSearchParams } from './useNormalizeRoomBookingSearchParams';

export function RoomBookingPage() {
  useNormalizeRoomBookingSearchParams();

  return (
    <ErrorBoundary fallback={<RoomBookingPageContent.Error />}>
      <Suspense fallback={<RoomBookingPageContent.Skeleton />}>
        <RoomBookingPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}
