import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RoomBookingPageContent } from './RoomBookingPageContent';
import { useCanonicalizeRoomBookingSearchParams } from './useCanonicalizeRoomBookingSearchParams';
import { PageHeader } from 'components/PageHeader';
import { colors } from '_tosslib/constants/colors';
import { css } from '@emotion/react';
import { RoomBookingBackLink } from './RoomBookingBackLink';

export function RoomBookingPage() {
  useCanonicalizeRoomBookingSearchParams();

  return (
    <ErrorBoundary fallback={<RoomBookingPageContent.Error />}>
      <Suspense fallback={<RoomBookingPageContent.Skeleton />}>
        <div
          css={css`
            background: ${colors.white};
            padding-bottom: 40px;
          `}
        >
          <PageHeader title="예약하기" topAddOn={<RoomBookingBackLink />} />

          <RoomBookingPageContent />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}
