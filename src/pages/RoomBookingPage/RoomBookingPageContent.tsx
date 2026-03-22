import { css } from '@emotion/react';
import { Suspense } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Border, Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { PageHeader } from 'components/PageHeader';
import { SectionHeader } from 'components/SectionHeader';
import { getRoomsQueryOptions } from 'pages/queryOptions';
import { RoomBookingAvailableRoomsSection } from './RoomBookingAvailableRoomsSection';
import { RoomBookingBackLink } from './RoomBookingBackLink';
import { RoomBookingConditionsSection } from './RoomBookingConditionsSection';
import { RoomBookingErrorBanner } from './RoomBookingErrorBanner';
import { useRoomBookingForm } from './useRoomBookingForm';

export function RoomBookingPageContent() {
  const { data: rooms } = useSuspenseQuery(getRoomsQueryOptions());

  const { form, isFilterComplete } = useRoomBookingForm();

  return (
    <FormProvider {...form}>
      <div
        css={css`
          background: ${colors.white};
          padding-bottom: 40px;
        `}
      >
        <PageHeader title="예약하기" topAddOn={<RoomBookingBackLink />} />

        <RoomBookingErrorBanner />

        <Spacing size={24} />

        <RoomBookingConditionsSection rooms={rooms} />

        <Spacing size={24} />
        <Border size={8} />
        <Spacing size={24} />

        {isFilterComplete ? (
          <Suspense fallback={<RoomBookingAvailableRoomsSection.Skeleton />}>
            <RoomBookingAvailableRoomsSection rooms={rooms} />
          </Suspense>
        ) : null}

        <Spacing size={24} />
      </div>
    </FormProvider>
  );
}

RoomBookingPageContent.Skeleton = () => {
  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <PageHeader title="예약하기" />

      <Spacing size={24} />

      <div
        css={css`
          padding: 0 24px;
        `}
      >
        <SectionHeader title="예약 조건" />
        <div
          css={css`
            height: 220px;
            border-radius: 14px;
            background: ${colors.grey50};
          `}
        />
      </div>
    </div>
  );
};

RoomBookingPageContent.Error = () => {
  return <></>;
};
