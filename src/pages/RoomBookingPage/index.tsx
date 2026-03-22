import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RoomBookingPageContent, RoomBookingPageContentSkeleton } from './RoomBookingPageContent';
import { useNormalizeRoomBookingSearchParams } from './useNormalizeRoomBookingSearchParams';

export function RoomBookingPage() {
  useNormalizeRoomBookingSearchParams();

  return (
    <ErrorBoundary fallback={<RoomBookingPageContent.Error />}>
      <Suspense fallback={<RoomBookingPageContentSkeleton />}>
        <RoomBookingPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}
