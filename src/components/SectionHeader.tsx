import { css } from '@emotion/react';
import { Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';

interface SectionHeaderProps {
  title: string;
  titleAddOn?: React.ReactNode;
}

export function SectionHeader({ title, titleAddOn }: SectionHeaderProps) {
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: baseline;
          gap: 6px;
        `}
      >
        <Text typography="t5" fontWeight="bold" color={colors.grey900}>
          {title}
        </Text>
        {titleAddOn ? titleAddOn : null}
      </div>
      <Spacing size={16} />
    </>
  );
}
