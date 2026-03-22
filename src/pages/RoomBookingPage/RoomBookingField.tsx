import { css } from '@emotion/react';
import type { ReactNode } from 'react';
import { Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface RoomBookingFieldProps {
  children: ReactNode;
  gap?: number;
  label: string;
}

export function RoomBookingField({ children, gap = 6, label }: RoomBookingFieldProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${gap}px;
      `}
    >
      <Text as="label" typography="t7" fontWeight="medium" color={colors.grey600}>
        {label}
      </Text>
      {children}
    </div>
  );
}

export const roomBookingInputCss = css`
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  height: 48px;
  background-color: ${colors.grey50};
  border-radius: 12px;
  color: ${colors.grey800};
  width: 100%;
  border: 1px solid ${colors.grey200};
  padding: 0 16px;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${colors.blue500};
  }
`;
