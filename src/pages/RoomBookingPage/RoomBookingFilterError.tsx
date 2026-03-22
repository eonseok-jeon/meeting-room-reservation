import { css } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { RoomBookingFormValues } from './schema';

export function RoomBookingFilterError() {
  const { formState } = useFormContext<RoomBookingFormValues>();

  const filterError =
    formState.errors.endTime?.message ??
    formState.errors.startTime?.message ??
    formState.errors.date?.message ??
    formState.errors.attendees?.message ??
    null;

  if (filterError == null) {
    return null;
  }

  return (
    <div
      css={css`
        padding: 0 24px;
      `}
    >
      <Spacing size={8} />
      <span
        css={css`
          color: ${colors.red500};
          font-size: 14px;
        `}
        role="alert"
      >
        {filterError}
      </span>
    </div>
  );
}
